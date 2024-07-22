import React from 'react';
import styles from '../css/adminContactNormalTable.module.css';

export default function AdminContactNormalTable({ boardList }) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>글번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>조회수</th>
            <th>작성일</th>
            <th>좋아요</th>
            <th>싫어요</th>
          </tr>
        </thead>
        <tbody>
          {boardList.map((board, index) => (
            <tr key={index}>
              <td>{board.boardNo}</td>
              <td><a href={`./boardView.do?bno=${board.boardNo}`}>{board.boardTitle}</a></td>
              <td>{board.boardMemberNick}</td>
              <td>{board.boardCount}</td>
              <td>{board.boardWriteDate}</td>
              <td>{board.boardLike}</td>
              <td>{board.boardHate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
