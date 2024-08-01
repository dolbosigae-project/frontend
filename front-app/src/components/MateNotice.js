import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import styles from '../css/mateNotice.module.css';

function MateNotice({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const socket = new SockJS('http://localhost:9999/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {},
      onConnect: () => {
        console.log('WebSocket 연결 완료 - MateNotice');
        client.subscribe(`/user/${userId}/queue/notifications`, (message) => {
          const notification = JSON.parse(message.body);
          setNotifications((prevNotifications) => [...prevNotifications, notification]);
        });
        setStompClient(client);
      },
      onStompError: (frame) => {
        console.error('WebSocket 연결 에러 - MateNotice:', frame);
      },
    });

    client.activate();

    return () => {
      if (client && client.active) {
        client.deactivate();
      }
    };
  }, [userId]);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleReadNotification = (index) => {
    setNotifications((prevNotifications) => prevNotifications.filter((_, i) => i !== index));
  };

  const handleAcceptInvite = (roomId) => {
    if (stompClient && stompClient.active) {
      stompClient.publish({
        destination: `/app/chat/acceptInvite`,
        body: JSON.stringify({ roomId, userId, response: 'accept' }),
      });
      setNotifications((prevNotifications) => prevNotifications.filter((n) => n.roomId !== roomId));
    }
  };

  const handleRejectInvite = (roomId) => {
    if (stompClient && stompClient.active) {
      stompClient.publish({
        destination: `/app/chat/rejectInvite`,
        body: JSON.stringify({ roomId, userId, response: 'reject' }),
      });
      setNotifications((prevNotifications) => prevNotifications.filter((n) => n.roomId !== roomId));
    }
  };

  return (
    <div className={styles.notificationContainer}>
      <button onClick={handleNotificationClick} className={styles.notificationButton}>
        알림
        {notifications.length > 0 && <span className={styles.notificationBadge}>{notifications.length}</span>}
      </button>
      {showNotifications && (
        <div className={styles.notificationDropdown}>
          {notifications.map((notification, index) => (
            <div key={index} className={styles.notificationItem}>
              <p>{notification.message}</p>
              {notification.type === 'chatInvite' && (
                <div>
                  <button onClick={() => handleAcceptInvite(notification.roomId)}>수락</button>
                  <button onClick={() => handleRejectInvite(notification.roomId)}>거절</button>
                </div>
              )}
              <button onClick={() => handleReadNotification(index)}>확인</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MateNotice;
