import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate 추가
import styles from '../css/board.module.css';
import SubTitleBoard from './SubTitles/SubTitleBoard';

export default function Board({ boardList = [], pagination, handlePageChange, user, deleteClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('제목');
  const [filteredBoardList, setFilteredBoardList] = useState(boardList);

  const navigate = useNavigate(); // useNavigate 훅 사용

  // Search handler
  const handleSearch = () => {
    const filteredList = boardList.filter(item => {
      const target = item[searchCategory];
      return target && target.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredBoardList(filteredList);
  };

  // Effect to reset filtered list when the boardList prop changes
  useEffect(() => {
    setFilteredBoardList(boardList);
  }, [boardList]);

  // Navigate to the write page
  const handleWriteClick = () => {
    navigate('/board/write');
  };

  return (
    <div className={styles.container}>
      <SubTitleBoard />
      {/* 검색 바 및 옵션 */}
      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <select value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)} className={styles.searchSelect}>
            <option value="제목">제목</option>
            <option value="작성자ID">작성자ID</option>
            <option value="작성자 닉네임">작성자 닉네임</option>
          </select>
          <input 
            type="text" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder="검색어 입력"
            className={styles.searchInput}
          />
          <button onClick={handleSearch} className={styles.searchButton}>검색</button>
          {/* 글쓰기 버튼 클릭 시 /board/write로 이동 */}
          <button onClick={handleWriteClick} className={styles.searchButton}>글쓰기</button>
        </div>
      </div>
      
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <colgroup>
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '40%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
          </colgroup>
          <thead>
            <tr>
              <th></th>
              <th>글번호</th>
              <th>제목</th>
              <th>작성자ID</th>   
              <th>작성자 닉네임</th>
              <th>작성일</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            {filteredBoardList.length > 0 ? (
              filteredBoardList.map((item, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>
                      {user && (user.boardMemberGradeNo === 0 || user.boardMemberId === item.memberId) && (
                        <button className={styles.deleteButton} onClick={() => deleteClick(item.no, item.commentCount)}>삭제</button>
                      )}
                      {user && user.boardMemberGradeNo === 0 && (
                        <button
                          className={`${styles.unansweredButton} ${item.commentCount > 0 ? styles.answered : styles.unanswered}`}
                        >
                          {item.commentCount > 0 ? '답변완료' : '미답변'}
                        </button>
                      )}
                    </td>
                    <td>{item.no}</td>
                    <td>
                      <Link to={`/board/detail/${item.no}`} className={styles.link}>
                        {item.title}
                      </Link>
                    </td>
                    <td>{item.boardmemberId}</td>
                    <td>{item.boardmembernick}</td>
                    <td>{item.date}</td>
                    <td>{item.commentCount}</td>
                  </tr>
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="7">No data available</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="7" className={styles.pagination}>
                <div className={styles.paginationGroup}>
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
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
