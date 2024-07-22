import React, { useEffect, useState } from 'react';
import styles from '../css/adminContactNormalTable.module.css';
import axios from 'axios';


export default function AdminContactNormalTable() {
  const [adminBoardList, setAdminBoardList] = useState([]); // 빈 배열로 초기화
  const [adminPagination, setAdminPagination] = useState(null);

  useEffect(() => {
    const readData = async () => {
      try {
        const response = await axios.get('http://localhost:9999/admin/contact');
        console.log(response);
        /* setAdminBoardList(response.data.members);
        setAdminPagination(response.data.pagination); */
      } catch (error) {
        console.error("There was an error fetching the member list!", error);
      }
    }
    readData();
  }, []);


  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>글번호</th>
            <th>제목</th>
            <th>작성자ID</th>
            <th>작성자 닉네임</th>
            <th>작성일</th>
            <th>답변 수</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>
    </div>
  );
}
