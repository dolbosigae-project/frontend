import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import styles from '../css/msgBox.module.css';
import { useNavigate } from 'react-router-dom';

function MsgBoxReceive() {
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [userId, setUserId] = useState('');
  const [selectedMessages, setSelectedMessages] = useState([]);

  const navigate = useNavigate();
  
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
    const fetchReceivedMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/msg/received/${userId}`);
        setReceivedMessages(response.data);
      } catch (error) {
        console.error('받은 메시지 목록을 가져오는 중 오류 발생:', error);
      }
    };

    if (userId) {
      fetchReceivedMessages();
    }
  }, [userId]);

  useEffect(() => {
    const socket = new SockJS('http://localhost:9999/ws');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: function (str) {
        console.log('연결 디버그: ' + str);
      },
      onConnect: (frame) => {
        console.log('연결됨: ' + frame);
        stompClient.subscribe('/user/queue/notifications', (message) => {
          const notification = JSON.parse(message.body);
          if (notification.rId === userId) {
            setReceivedMessages((prevMessages) => [notification, ...prevMessages]);
          }
        });
      },
      onStompError: (frame) => {
        console.error('에러: ' + frame.headers['message']);
        console.error('상세 내용: ' + frame.body);
      },
    });

    stompClient.activate();

    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [userId]);


  const handleReply = (message) => {
    // 메시지 보내기 페이지로 이동하며 보낸이 ID 전달
    navigate(`/msg/send/${message.sId}`);
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

  const handleDelete = async (msgId) => {
    try {
      await axios.delete(`http://localhost:9999/msg/delete/${msgId}`);
      setReceivedMessages(receivedMessages.filter(message => message.msgId !== msgId));
    } catch (error) {
      console.error('메시지 삭제 중 오류 발생:', error);
    }
};

const handleDeleteSelected = async () => {
    try {
      await Promise.all(selectedMessages.map(msgId => axios.delete(`http://localhost:9999/msg/delete/${msgId}`)));
      setReceivedMessages(receivedMessages.filter(message => !selectedMessages.includes(message.msgId)));
      setSelectedMessages([]);
    } catch (error) {
      console.error('선택한 메시지 삭제 중 오류 발생:', error);
    }
};

  return (
    <div>
      <div className={styles.msgBoxContainer}>
        <h1 className={styles.msgBoxHeader}>받은 쪽지함</h1>
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
              <th className={styles.msgBoxTh}>확인 여부</th>
              <th className={styles.msgBoxTh}>보낸이</th>
              <th className={styles.msgBoxTh}>제목</th>
              <th className={styles.msgBoxTh}>내용</th>
              <th className={styles.msgBoxTh}>받은 시간</th>
              {/* <th className={styles.msgBoxTh}>답장</th> */}
              <th className={styles.msgBoxTh}>삭제</th>
            </tr>
          </thead>
          <tbody>
            {receivedMessages.map(message => (
              <tr key={message.msgId} className={styles.msgBoxTr}>
                <td className={styles.msgBoxTd}><input type="checkbox" onChange={() => handleSelectMessage(message.msgId)} /></td>
                <td className={styles.msgBoxTd}>{message.isRead ? '읽음' : '읽지않음'}</td>
                <td className={styles.msgBoxTd}>{message.sId}</td>
                <td className={styles.msgBoxTd}>{message.title}</td>
                <td className={styles.msgBoxTd}>{message.content}</td>
                <td className={styles.msgBoxTd}>{new Date(message.sentTime).toLocaleString()}</td>
                {/* <td className={styles.msgBoxTd}>
                  <button className={`${styles.msgBoxButton} ${styles.msgBoxReplyButton}`} onClick={() => handleReply(message)}>답장</button>
                </td> */}
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

export default MsgBoxReceive;
