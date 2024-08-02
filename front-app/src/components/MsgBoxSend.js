import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../css/msgBox.module.css';

function MsgBoxSend() {
  const [sentMessages, setSentMessages] = useState([]);
  const [userId, setUserId] = useState('');
  const [selectedMessages, setSelectedMessages] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser && parsedUser.boardMemberId) {
        setUserId(parsedUser.boardMemberId);
      }
    } else {
      console.error('로그인된 사용자가 없습니다.');
    }
  }, []);

  useEffect(() => {
    const fetchSentMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/msg/sent/${userId}`);
        setSentMessages(response.data);
      } catch (error) {
        console.error('보낸 메시지 목록을 가져오는 중 오류 발생:', error);
      }
    };

    if (userId) {
      fetchSentMessages();
    }
  }, [userId]);

  const handleDelete = async (msgId) => {
    try {
      await axios.delete(`http://localhost:9999/msg/message/${msgId}`);
      setSentMessages(sentMessages.filter(message => message.msgId !== msgId));
    } catch (error) {
      console.error('메시지 삭제 중 오류 발생:', error);
    }
  };

  const handleSelectMessage = (msgId) => {
    setSelectedMessages((prevSelected) => {
      if (prevSelected.includes(msgId)) {
        return prevSelected.filter(id => id !== msgId);
      } else {
        return [...prevSelected, msgId];
      }
    });
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(selectedMessages.map(msgId => axios.delete(`http://localhost:9999/msg/message/${msgId}`)));
      setSentMessages(sentMessages.filter(message => !selectedMessages.includes(message.msgId)));
      setSelectedMessages([]);
    } catch (error) {
      console.error('선택한 메시지 삭제 중 오류 발생:', error);
    }
  };

  return (
    <div>
      <div className={styles.msgBoxContainer}>
        <h1 className={styles.msgBoxHeader}>보낸 쪽지함</h1>
        <div className={styles.buttonContainer}>
          <button
            className={styles.deleteSelectedButton}
            onClick={handleDeleteSelected}
            disabled={selectedMessages.length === 0}
          >
            선택 삭제
          </button>
        </div>
        <table className={styles.msgBoxTable}>
          <thead>
            <tr>
              <th className={styles.msgBoxTh}><input type="checkbox" /></th>
              <th className={styles.msgBoxTh}>수신 확인 여부</th>
              <th className={styles.msgBoxTh}>받은이</th>
              <th className={styles.msgBoxTh}>제목</th>
              <th className={styles.msgBoxTh}>내용</th>
              <th className={styles.msgBoxTh}>보낸 시간</th>
              <th className={styles.msgBoxTh}>삭제</th>
            </tr>
          </thead>
          <tbody>
            {sentMessages.map(message => (
              <tr key={message.msgId} className={styles.msgBoxTr}>
                <td className={styles.msgBoxTd}><input type="checkbox" onChange={() => handleSelectMessage(message.msgId)} /></td>
                <td className={styles.msgBoxTd}>{message.isRead ? '읽음' : '읽지않음'}</td>
                <td className={styles.msgBoxTd}>{message.rId}</td>
                <td className={styles.msgBoxTd}>{message.title}</td>
                <td className={styles.msgBoxTd}>{message.content}</td>
                <td className={styles.msgBoxTd}>{new Date(message.sentTime).toLocaleString()}</td>
                <td className={styles.msgBoxTd}>
                  <button className={`${styles.msgBoxButton} ${styles.msgBoxDeleteButton}`} onClick={() => handleDelete(message.msgId)}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MsgBoxSend;
