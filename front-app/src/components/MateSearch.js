import styles from '../css/mateSearch.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import default_img from '../img/default_img.png';
import SubTitleMateSearch from './SubTitles/SubTitleMateSearch';

export default function MateSearch() {
  const [mateList, setMateList] = useState([]); // 빈 배열로 초기화
  const [pagination, setPagination] = useState(null);
  const [searchRegion, setSearchRegion] = useState(''); // 지역 검색어 상태 변수

  useEffect(() => {
    const readData = async () => {
      try {
        const response = await axios.get('http://localhost:9999/member/walkmates');
        console.log('회원 목록:', response.data.members); // 디버그: 회원 목록
        console.log('페이지네이션 정보:', response.data.pagination); // 디버그: 페이지네이션 정보
        setMateList(response.data.members);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error("T인 회원들 불러오는데 실패한거임", error);
      }
    }
    readData();
  }, []);

  const handlePageChange = (pageNo) => {
    const fetchPageData = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/member/walkmates?page=${pageNo}`);
        console.log('페이지 변경 - 회원 목록:', response.data.members); // 디버그: 페이지 변경 시 회원 목록
        console.log('페이지 변경 - 페이지네이션 정보:', response.data.pagination); // 디버그: 페이지 변경 시 페이지네이션 정보
        setMateList(response.data.members);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error("There was an error fetching the page data!", error);
      }
    }
    fetchPageData();
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:9999/member/walkmates/search', {
        params: {
          region: searchRegion
        }
      });
      console.log('검색 결과 - 회원 목록:', response.data.members); // 디버그: 검색 결과 회원 목록
      console.log('검색 결과 - 페이지네이션 정보:', response.data.pagination); // 디버그: 검색 결과 페이지네이션 정보
      setMateList(response.data.members || []); // 데이터가 없으면 빈 배열로 설정
      setPagination(response.data.pagination || null); // 페이지네이션 데이터가 없으면 null로 설정
    } catch (error) {
      console.error("여기서 주소로 검색하는건데 오류났음", error);
      alert("매이트 검색 중 오류가 발생했습니다.");
      setMateList([]); // 오류 발생 시 목록 초기화
      setPagination(null); // 오류 발생 시 페이지네이션 초기화
    }
  };

  // 회원 클릭 시 새로운 창에서 PetProfile 페이지가 열리도록 함
  const handleMateClick = (id) => {
    const url = `/mate/petinfo?userId=${id}`; // PetProfile 페이지의 URL에 ID를 쿼리 파라미터로 포함
    const windowFeatures = 'width=500,height=650,left=100,top=100,toolbar=no'; // 창의 크기와 위치 지정 및 UI 요소 숨김
    window.open(url, '_blank', windowFeatures); // 특정 크기와 위치로 새로운 창 열기
  };

  // '채팅하러가기(임시버튼)' 클릭 핸들러 추가 (새 창에서 열리도록 수정)
  const handleChatClick = () => {
    const url = '/mate/intro'; // ChatIntro 페이지의 URL
    const windowFeatures = 'width=500,height=350,left=100,top=100,toolbar=no'; // 창의 크기와 위치 지정 및 UI 요소 숨김
    window.open(url, '_blank', windowFeatures); // 특정 크기와 위치로 새로운 창 열기
  };

  // '쪽지함(임시)' 클릭 핸들러 추가
  const handleMsgClick = () => {
    const url = '/mate/msg'; // 쪽지함 페이지의 URL
    window.open(url, '_blank'); // 새로운 탭에서 열기
  };

  return (
    <div>
      <SubTitleMateSearch />
      <div className={styles.mateSearchBox}>
        <input value={searchRegion} onChange={(e) => setSearchRegion(e.target.value)} placeholder="지역으로 검색" />
        <button onClick={handleSearch}>검색</button>
        <button onClick={handleChatClick}>채팅하러가기(임시버튼)</button> 
        <button onClick={handleMsgClick}>쪽지함(임시)</button> 
      </div>
      {mateList.length === 0 ? (
        <div>해당 데이터가 없습니다.</div>
      ) : (
        <div className={styles.mateTableContainer}>
          <div className={styles.mateTable}>
            {mateList.map((mate) => (
              <div key={mate.boardMemberId} className={styles.mateCard} onClick={() => handleMateClick(mate.boardMemberId)}> {/* 회원 카드 클릭 시 handleMateClick 호출 */}
                <img src={mate.petImagePath || default_img} alt="Pet" />
                <span>{mate.boardMemberNick}</span>
                <div className={styles.mateFlexContainer}>
                  <input value={mate.petInfo || ''} className={`${styles.mateInput} ${styles.matePetInfo}`} readOnly />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.matePagination}>
            {pagination && pagination.previousPageGroup && (
              <button onClick={() => handlePageChange(pagination.startPageOfPageGroup - 1)}>◀</button>
            )}
            {pagination && Array.from({ length: pagination.endPageOfPageGroup - pagination.startPageOfPageGroup + 1 }, (_, i) => (
              <button
                key={i + pagination.startPageOfPageGroup}
                onClick={() => handlePageChange(i + pagination.startPageOfPageGroup)}
                className={pagination.currentPage === i + pagination.startPageOfPageGroup ? styles.activePage : ''}
              >
                {i + pagination.startPageOfPageGroup}
              </button>
            ))}
            {pagination && pagination.nextPageGroup && (
              <button onClick={() => handlePageChange(pagination.endPageOfPageGroup + 1)}>▶</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
