import React, { useEffect, useState } from 'react';
import styles from '../css/adminContactDefaultTable.module.css';
import axios from 'axios';
import logo_small from '../img/logo_small.png';

export default function AdminContactDefaultTable() {
  const [adminDefaultList, setAdminDefaultList] = useState([]);
  const [openIndexes, setOpenIndexes] = useState({});

  useEffect(() => {
    const readData = async () => {
      try {
        const response = await axios.get('http://localhost:9999/admin/default');
        /* console.log(response); */
        setAdminDefaultList(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    readData();
  }, []);

  const toggleContent = (index) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const formatContent = (content) => {
    return { __html: content.replace(/\\n/g, '<br>') }; // 줄바꿈 문자 변환
  };

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
              <tr className={`${styles.contentRow} ${openIndexes[index] ? styles.show : ''}`}>
                <td colSpan="3" onClick={() => toggleContent(index)}>
                  <div dangerouslySetInnerHTML={formatContent(item.faqcontent)} />
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
