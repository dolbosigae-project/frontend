import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../css/mateSearch.module.css';
import default_img from '../img/default_img.png';
import SubTitleMateSearch from './SubTitles/SubTitleMateSearch';

export default function MateSearch() {
  const [mateList, setMateList] = useState([]); // 빈 배열로 초기화
  const [pagination, setPagination] = useState(null);
  const [searchAddress, setSearchAddress] = useState(''); // 지역 검색어 상태 변수
  const [userId, setUserId] = useState(''); // 사용자 ID 상태 변수
  const [user, setUser] = useState(null); // 사용자 정보 상태 변수 추가
  const [isSearching, setIsSearching] = useState(false); // 검색 상태 변수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 변수
  const [selectedIds, setSelectedIds] = useState([]); // 선택된 회원 ID 상태 변수

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser && parsedUser.boardMemberId) {
        setUserId(parsedUser.boardMemberId);
        setUser(parsedUser); // 사용자 정보 상태 설정
      }
    } else {
      console.error('로그인된 사용자가 없습니다.');
    }

    readData();
  }, [currentPage]);

  const readData = async () => {
    try {
      const response = await axios.get('http://localhost:9999/member/walkmates', {
        params: {
          page: currentPage,
        },
      });
      console.log('회원 목록:', response.data.members); // 디버그: 회원 목록
      console.log('페이지네이션 정보:', response.data.pagination); // 디버그: 페이지네이션 정보
      setMateList(response.data.members);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('T인 회원들 불러오는데 실패한거임', error);
    }
  };

  const handlePageChange = (pageNo) => {
    setCurrentPage(pageNo);
    const fetchPageData = async () => {
      try {
        const response = await axios.get(
          isSearching ? 'http://localhost:9999/member/walkmate/search' : 'http://localhost:9999/member/walkmates',
          {
            params: {
              page: pageNo,
              addressText: isSearching ? searchAddress : '',
            },
          },
        );
        console.log('페이지 변경 - 회원 목록:', response.data.members); // 디버그: 페이지 변경 시 회원 목록
        console.log('페이지 변경 - 페이지네이션 정보:', response.data.pagination); // 디버그: 페이지 변경 시 페이지네이션 정보
        setMateList(response.data.members);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error('There was an error fetching the page data!', error);
      }
    };
    fetchPageData();
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:9999/member/walkmate/search', {
        params: {
          addressText: searchAddress,
          page: 1,
        },
      });
      console.log('검색 결과 - 회원 목록:', response.data.members); // 디버그: 검색 결과 회원 목록
      console.log('검색 결과 - 페이지네이션 정보:', response.data.pagination); // 디버그: 검색 결과 페이지네이션 정보
      setMateList(response.data.members || []); // 데이터가 없으면 빈 배열로 설정
      setPagination(response.data.pagination || null); // 페이지네이션 데이터가 없으면 null로 설정
      setIsSearching(true); // 검색 상태 설정
      setCurrentPage(1); // 검색 시 페이지를 1로 
    } catch (error) {
      console.error('여기서 주소로 검색하는건데 오류났음', error);
      alert('매이트 검색 중 오류가 발생했습니다.');
      setMateList([]); // 오류 발생 시 목록 초기화
      setPagination(null); // 오류 발생 시 페이지네이션 초기화
      setIsSearching(false); // 검색 상태 해제
    }
  };

  const handleMateClick = (id) => {
    const url = `/mate/petinfo?userId=${id}`; // PetProfile 페이지의 URL에 ID를 쿼리 파라미터로 포함
    const windowFeatures = 'width=500,height=650,left=100,top=100,toolbar=no';
    window.open(url, '_blank', windowFeatures);
  };

  const handleChangeWalkProfile = async () => {
    console.log('변경하려는 Id들 : ', selectedIds); // 로그 추가
    try {
      await axios.post(`http://localhost:9999/walkmate/changeTF`, { Wid: selectedIds });
      readData(); // 목록 새로 고침
      setSelectedIds([]);
    } catch (error) {
      console.error('T -> F 변경 중 오류', error);
      alert('T에서 F로 변경 중 오류가 발생했습니다.');
    }
  };

  const handleCheckboxChange = (memberId) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(memberId) ? prevSelectedIds.filter((id) => id !== memberId) : [...prevSelectedIds, memberId],
    );
  };

  return (
    <div>
      <SubTitleMateSearch />
      <div className={styles.mateSearchBox}>
        <input value={searchAddress} onChange={(e) => setSearchAddress(e.target.value)} placeholder="지역으로 검색" />
        <button onClick={handleSearch}>검색</button>
        {user && user.boardMemberGradeNo === 0 && (
          <button onClick={handleChangeWalkProfile} disabled={selectedIds.length === 0} style={{ marginLeft: '10px' }}>
            T to F
          </button>
        )}
      </div>
      {mateList.length === 0 ? (
        <div>해당 데이터가 없습니다.</div>
      ) : (
        <div className={styles.mateTableContainer}>
          <div className={styles.mateTable}>
            {mateList.map((mate) => (
              <div key={mate.boardMemberId} className={styles.mateCard} onClick={() => handleMateClick(mate.boardMemberId)}>
                {user && user.boardMemberGradeNo === 0 && (
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(mate.boardMemberId)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleCheckboxChange(mate.boardMemberId);
                    }}
                  />
                )}
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
            {pagination &&
              Array.from({ length: pagination.endPageOfPageGroup - pagination.startPageOfPageGroup + 1 }, (_, i) => (
                <button
                  key={i + pagination.startPageOfPageGroup}
                  onClick={() => handlePageChange(i + pagination.startPageOfPageGroup)}
                  className={pagination.currentPage === i + pagination.startPageOfPageGroup ? styles.mateActivePage : ''}
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
      <div className={styles.mateMypageButtonContainer}>
        <Link to="/member/mypage" className={styles.mateMypageButton}>
          프로필 수정
        </Link>
      </div>
    </div>
  );
}
