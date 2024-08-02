import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

function ChatNotification() {
  const [stompClient, setStompClient] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState('');

  // 로그인된 사용자 정보를 불러오는 부분
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser && parsedUser.boardMemberId) {
        setUserId(parsedUser.boardMemberId);
      } else {
        console.error('사용자 정보에 boardMemberId가 없습니다.');
      }
    } else {
      console.error('로그인된 사용자가 없습니다.');
    }
  }, []);

  // STOMP 클라이언트 설정 및 메시지 구독
  useEffect(() => {
    if (!userId) return; // userId가 없으면 구독하지 않음

    // WebSocket 연결 설정
    const socket = new SockJS('http://localhost:9999/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {},
      onConnect: () => {
        console.log('WebSocket 연결 완료');
        setStompClient(client);

        // /user/queue/chat 경로를 구독하여 채팅 요청 메시지 수신
        const subscription = client.subscribe('/user/queue/chat', (message) => {
          const chatRequest = JSON.parse(message.body);
          console.log('채팅 요청 수신:', chatRequest);

          // 요청 메시지를 notifications 상태에 추가
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
  }, [userId]); // userId가 설정된 후에만 WebSocket 연결

  return (
    <div>
      <h2>채팅 요청 알림</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
}

export default ChatNotification;
