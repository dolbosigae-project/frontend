import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import styles from '../css/mateNotice.module.css';

function MateNotice({ userId }) {
  const [stompClient, setStompClient] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const socket = new SockJS('http://localhost:9999/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {},
      onConnect: () => {
        console.log('WebSocket 연결 완료');
        setStompClient(client);

        const subscription = client.subscribe('/user/queue/chat', (message) => {
          const chatRequest = JSON.parse(message.body);
          console.log('채팅 요청 수신:', chatRequest);

          setNotifications((prevNotifications) => [
            ...prevNotifications,
            `${chatRequest.sender}님으로부터 채팅 요청이 도착했습니다.`,
          ]);
        });

        return () => {
          subscription.unsubscribe();
        };
      },
      onStompError: (frame) => {
        console.error('WebSocket 연결 에러:', frame);
      },
      onWebSocketClose: () => {
        console.error('WebSocket 연결이 끊어졌습니다.');
        setStompClient(null);
      },
      onWebSocketError: () => {
        console.error('WebSocket 연결 에러가 발생했습니다.');
        alert('WebSocket 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.');
      },
    });

    client.activate();

    return () => {
      if (client && client.active) {
        client.deactivate();
      }
    };
  }, [userId]);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className={styles.notificationContainer}>
      <div className={styles.bellIcon} onClick={toggleDropdown}>
        🔔
      </div>
      {isDropdownVisible && (
        <div className={styles.dropdown}>
          <h3>채팅 요청 알림</h3>
          <ul className={styles.notificationList}>
            {notifications.map((notification, index) => (
              <li key={index} className={styles.notificationItem}>
                {notification}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MateNotice;
