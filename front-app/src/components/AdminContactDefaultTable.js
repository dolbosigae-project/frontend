import React, { useEffect, useState } from 'react';
import styles from '../css/adminContactDefaultTable.module.css';
import axios from 'axios';
import logo_small from '../img/logo_small.png';
import AdminCommentWrite from './AdminCommentWrite'; // AdminCommentWrite 컴포넌트 임포트

export default function AdminContactDefaultTable() {
  const [adminDefaultList, setAdminDefaultList] = useState([]); // FAQ 목록 상태 관리
  const [openIndexes, setOpenIndexes] = useState({}); // 각 항목의 열림/닫힘 상태 관리

  // 컴포넌트가 마운트될 때 데이터 가져오기
  useEffect(() => {
    const readData = async () => {
      try {
        const response = await axios.get('http://localhost:9999/admin/default');
        setAdminDefaultList(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    readData();
  }, []);

  // 내용 토글 함수
  const toggleContent = (index) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // 줄바꿈 문자를 <br> 태그로 변환하는 함수
  const formatContent = (content) => {
    return { __html: content.replace(/\\n/g, '<br>') };
  };

  // 데이터 로딩 중 메시지 표시
  if (adminDefaultList.length === 0) {
    return <div>자주 묻는 질문을 불러오는 중입니다...</div>;
  }

  return (
    <div className={styles.defaultContainer}>
      <div className={styles.defaultTitle}>
        <img src={logo_small} alt="logo_small" className={styles.logo_small} />
        <h2>자주 묻는 질문</h2>
      </div>
      <table className={styles.defaultTable}>
        <thead>
          <tr>
            <th>글번호</th>
            <th>제목</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {adminDefaultList.map((item, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => toggleContent(index)}>
                <td>{item.faqid}</td>
                <td>{item.faqtitle}</td>
                <td>{item.faqdate}</td>
              </tr>
              {openIndexes[index] && (
                <tr className={`${styles.contentRow} ${styles.show}`}>
                  <td colSpan="3">
                    <div dangerouslySetInnerHTML={formatContent(item.faqcontent)} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
