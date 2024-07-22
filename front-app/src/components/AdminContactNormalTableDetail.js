import SubTitleAdminContact from './SubTitles/SubTitleAdminContact';
import styles from '../css/adminContactNormalTableDetail.module.css';

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function AdminContactNormalTableDetail() {
  const { adminNo } = useParams();
  const [detail, setDetail] = useState(null);
  const [comment, setComment] = useState([]);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/admin/contact/detail/${adminNo}`);
        console.log(response);
        setComment(response.data.commentDetails);
        setDetail(response.data);
      } catch (error) {
        console.error("There was an error fetching the detail!", error);
      }
    };
    fetchDetail();
  }, [adminNo]);

  if (!detail) return <div>페이지 로드 중입니다...</div>;

  return (
    <div>
      <SubTitleAdminContact />
      <div className={styles.detailContainer}>
        <table className={styles.detailTable}>
          <tbody>
            <tr className={styles.headerRow}>
              <th>글번호</th>
              <td>{detail.adminNo}</td>
              <th>작성일</th>
              <td>{detail.adminDate}</td>
            </tr>
            <tr>
              <th>작성자ID</th>
              <td>{detail.adminMemberId}</td>
              <th>작성자 닉네임</th>
              <td>{detail.adminNick}</td>
            </tr>
            <tr>
              <th>제목</th>
              <td colSpan={3}>{detail.adminTitle}</td>
            </tr>
            <tr className={styles.contentRow}>
              <th colSpan={4}>내용</th>
            </tr>
            <tr>
              <td className={styles.contentCell} colSpan="4">{detail.adminContent}</td>
            </tr>
            {comment.map((item, index) => (
              <React.Fragment key={index}>
                <tr>
                  <th>댓글번호</th>
                  <td>{item.adminCommentNo}</td>
                  <th>작성일</th>
                  <td>{item.adminCommentDate}</td>
                </tr>
                <tr>
                  <th>작성ID</th>
                  <td>{item.adminCommentMemberId}</td>
                  <th>작성자</th>
                  <td>{item.adminCommentNick}</td>
                </tr>
                <tr>
                  <th colSpan={4}>답변내용</th>
                </tr>
                <tr>
                  <td colSpan={4} className={styles.commentContent}>{item.adminCommentContent}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <Link to='/admin/contact'>
          <button className={styles.commentBtn}>글 목록</button>
        </Link>
      </div>
    </div>
  );
}
