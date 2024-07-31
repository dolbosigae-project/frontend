import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import styles from '../css/chatRequest.module.css';

function ChatRequestYN({ userId, onAccept, onReject }) {
  const [requests, setRequests] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS('http://localhost:9999/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {},
      onConnect: () => {
        console.log('WebSocket 연결 완료 - ChatRequestYN');
        client.subscribe(`/user/${userId}/queue/messages`, (message) => {
          const notification = JSON.parse(message.body);
          console.log('받은 요청 메시지:', notification);
          setRequests((prevRequests) => [...prevRequests, notification]);
        });
        setStompClient(client);
      },
      onStompError: (frame) => {
        console.error('WebSocket 연결 에러 - ChatRequestYN:', frame);
      },
    });

    client.activate();

    return () => {
      if (client && client.active) {
        client.deactivate();
      }
    };
  }, [userId]);

  const handleAccept = (request) => {
    onAccept(request);
    setRequests((prevRequests) => prevRequests.filter((r) => r !== request));
  };

  const handleReject = (request) => {
    onReject(request);
    setRequests((prevRequests) => prevRequests.filter((r) => r !== request));
  };

  return (
    <div className={styles.chatRequestContainer}>
      <h3>채팅 요청</h3>
      {requests.length > 0 ? (
        requests.map((request, index) => (
          <div key={index} className={styles.requestItem}>
            <p>{request.sender}님의 채팅 요청</p>
            <button onClick={() => handleAccept(request)}>수락</button>
            <button onClick={() => handleReject(request)}>거절</button>
          </div>
        ))
      ) : (
        <p>채팅 요청이 없습니다.</p>
      )}
    </div>
  );
}

export default ChatRequestYN;
