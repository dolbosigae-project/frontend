import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from '../css/boardDetail.module.css';
import SubTitleBoard from './SubTitles/SubTitleBoard';

export default function BoardDetail() {
  const { showNo } = useParams(); // 게시글 번호를 가져옵니다.
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/showinfo`, {
          params: { showNo }
        });
        setDetail(response.data);
      } catch (error) {
        console.error("There was an error fetching the detail!", error);
        setError('게시글을 가져오는 중 오류가 발생했습니다.');
      }
    };
    fetchDetail();
  }, [showNo]);

  // 게시글 삭제 버튼
  const deleteClick = async () => {
    try {
      const response = await axios.delete(`http://localhost:9999/boards/delete/${showNo}`, {
        headers: {
          'userRole': user && user.boardMemberGradeNo === 0 ? 'ADMIN' : ''
        }
      });
      if (response.data.status === 'success') {
        alert('게시글을 삭제하였습니다.\n게시판 화면으로 이동합니다.');
        navigate('/board');
      } else {
        setError(response.data.message || '게시글 삭제 오류');
      }
    } catch (error) {
      console.error("게시글 삭제 오류", error);
      setError('게시글 삭제 중 오류가 발생했습니다.');
    }
  };

  if (!detail) return <div>페이지 로드 중입니다...</div>;

  return (
    <div>
      <SubTitleBoard /> {/* 동일한 서브타이틀 컴포넌트 사용 */}
      <div className={styles.detailContainer}>
        {error && <div className={styles.error}>{error}</div>}
        <table className={styles.detailTable}>
          <tbody>
            <tr className={styles.headerRow}>
              <th>글번호</th>
              <td>{detail.showNo}</td>
              <th>작성일</th>
              <td>{new Date(detail.showDate).toLocaleDateString()}</td>
            </tr>
            <tr>
              <th>작성자ID</th>
              <td>{detail.mId}</td>
              <th>작성자 닉네임</th>
              <td>{detail.pNick}</td>
            </tr>
            <tr>
              <th>제목</th>
              <td colSpan={3}>{detail.showTitle}</td>
            </tr>
            <tr className={styles.contentRow}>
              <th colSpan={4}>내용</th>
            </tr>
            <tr>
              <td className={styles.contentCell} colSpan="4">{detail.showContent}</td>
            </tr>
          </tbody>
        </table>
        <div className={styles.detailBtnGroup}>
          <Link to='/board'>
            <button className={styles.commentBtn}>글 목록</button>
          </Link>
          {user && (user.boardMemberGradeNo === 0 || user.boardMemberId === detail.mId) && (
              <button className={styles.deleteBigBtn} onClick={deleteClick}>게시글 삭제</button>
          )}
        </div>
      </div>
    </div>
  );
}
