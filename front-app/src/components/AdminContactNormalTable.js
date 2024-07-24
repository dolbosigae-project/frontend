import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/adminContactNormalTable.module.css';
import axios from 'axios';

export default function AdminContactNormalTable() {
  const [adminBoardList, setAdminBoardList] = useState([]);
  const [pagination, setPagination] = useState(null);
  const[user, setUser] = useState(null);

  //로컬 스토리지에서 user정보를 가져와 노출여부를 설정함
  useEffect(()=>{
    const storedUser = localStorage.getItem('user');
    if(storedUser){
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  },[]);


  useEffect(() => {
    const readData = async () => {
      try {
        const response = await axios.get('http://localhost:9999/admin/contact');
        console.log(response);
        setAdminBoardList(response.data.admin);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error("There was an error fetching the member list!", error);
      }
    }
    readData();
  }, []);

  const handlePageChange = (pageNo) => {
    const fetchPageData = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/admin/contact?page=${pageNo}`);
        setAdminBoardList(response.data.admin);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error("There was an error fetching the page data!", error);
      }
    }
    fetchPageData();
  };

  // 삭제 버튼
  const deleteClick = async (adminNo, adminCommentCount) => {
    try {
      const response = await axios.delete(`http://localhost:9999/admin/delete/${adminNo}/${adminCommentCount}`);
      alert(response.data); // 서버 응답 메시지를 알림으로 표시

      // 상태 업데이트: 삭제된 게시글을 목록에서 제거한 후 최신 데이터 다시 불러오기
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:9999/admin/contact?page=${pagination.currentPage}`);
          setAdminBoardList(response.data.admin);
          setPagination(response.data.pagination);
        } catch (error) {
          console.error("There was an error fetching the page data!", error);
        }
      };
      fetchData();
    } catch (error) {
      console.error("문의글 삭제 오류", error);
      alert("문의글 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
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
            <th>답변 수</th>
          </tr>
        </thead>
        <tbody>
          {adminBoardList.map((item, index) => (
            <React.Fragment key={index}>
              <tr>
                  <td>
                  {user && (user.boardMemberGradeNo === 0 || user.boardMemberId === item.adminMemberId) &&(
                    <button className={styles.deleteButton} onClick={() => deleteClick(item.adminNo, item.adminCommentCount)}>삭제</button>
                  )}
                  {user && user.boardMemberGradeNo === 0 &&(
                    <button
                      className={`${styles.unansweredButton} ${item.adminCommentCount > 0 ? styles.answered : styles.unanswered}`}
                    >
                      {item.adminCommentCount > 0 ? '답변완료' : '미답변'}
                    </button>
                    )}
                  </td>
                <td>{item.adminNo}</td>
                <td>
                  <Link to={`/admin/contact/detail/${item.adminNo}`} className={styles.link}>
                    {item.adminTitle}
                  </Link>
                </td>
                <td>{item.adminMemberId}</td>
                <td>{item.adminNick}</td>
                <td>{item.adminDate}</td>
                <td>{item.adminCommentCount}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="7" className={styles.pagination}>
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
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}