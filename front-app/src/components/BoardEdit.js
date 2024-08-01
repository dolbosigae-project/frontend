import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../css/board.module.css';

export default function BoardEdit() {
  const { showNo } = useParams();
  const [detail, setDetail] = useState(null);
  const [showTitle, setShowTitle] = useState('');
  const [showContent, setShowContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/showinfo`, {
          params: { showNo }
        });
        setDetail(response.data);
        setShowTitle(response.data.showTitle);
        setShowContent(response.data.showContent);
      } catch (error) {
        console.error("There was an error fetching the detail!", error);
        setError('게시글을 가져오는 중 오류가 발생했습니다.');
      }
    };
    fetchDetail();
  }, [showNo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:9999/boards/update/${showNo}`, {
        showTitle,
        showContent
      });
      if (response.data.status === 'success') {
        alert('게시글이 수정되었습니다.');
        navigate(`/boarddetail/${showNo}`);
      } else {
        setError(response.data.message || '게시글 수정 오류');
      }
    } catch (error) {
      console.error("게시글 수정 오류", error);
      setError('게시글 수정 중 오류가 발생했습니다.');
    }
  };

  if (!detail) return <div>페이지 로드 중입니다...</div>;

  return (
    <div className={styles.editContainer}>
      <h1>게시글 수정</h1>
      {error && <div className={styles.error}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목:</label>
          <input
            type="text"
            value={showTitle}
            onChange={(e) => setShowTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>내용:</label>
          <textarea
            value={showContent}
            onChange={(e) => setShowContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">수정 완료</button>
      </form>
    </div>
  );
}
