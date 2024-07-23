import styles from '../css/mateSearch.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import default_img from '../img/default_img.png';
import SubTitleMateSearch from './SubTitleMateSearch';

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

  return (
    <div>
      <SubTitleMateSearch />
      <div className={styles.mateSearchBox}>
        <input value={searchRegion} onChange={(e) => setSearchRegion(e.target.value)} placeholder="지역으로 검색" />
        <button onClick={handleSearch}>검색</button>
      </div>
      {mateList.length === 0 ? (
        <div>해당 데이터가 없습니다.</div>
      ) : (
        <div className={styles.mateTableContainer}>
          <div className={styles.mateTable}>
            {mateList.map((mate) => (
              <div key={mate.boardMemberId} className={styles.mateCard}>
                <img src={mate.petImagePath || default_img} alt="Pet" />
                <span>{mate.boardMemberNick}</span>
                {/* <div className={styles.mateFlexContainer}>
                  <span className={styles.mateLabel}>출생년월</span>
                  <input value={mate.petBirth || ''} readOnly className={styles.mateInput} />
                </div> */}
                <div className={styles.mateFlexContainer}>
                  {/* <span className={styles.mateLabel}>소개글</span> */}
                  <input value={mate.petInfo || ''} className={`${styles.mateInput} ${styles.matePetInfo}`} readOnly />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.matePagination}>
            {pagination && pagination.priviousPageGroup && (
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
