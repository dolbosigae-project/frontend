import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import styles from '../css/chatRoom.module.css';

function ChatCreatedRoom({ roomId, nickname }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user'); // localStorage에서 사용자 정보 가져오기
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
    if (roomId) {
      connectWebSocket(roomId).then(client => {
        setStompClient(client);
      });
    }
  }, [roomId]);

  const connectWebSocket = (roomId) => {
    return new Promise((resolve, reject) => {
      const client = new Client({
        brokerURL: 'ws://localhost:9999/ws',
        connectHeaders: {},
        webSocketFactory: () => new SockJS('http://localhost:9999/ws'),
        onConnect: (frame) => {
          console.log("--------WebSocket 연결 완료, 방 이름:", roomId, "닉네임:", nickname); // 디버그: WebSocket 연결 완료 로그

          setStompClient(client);
          client.subscribe(`/topic/${roomId}`, (messageOutput) => {
            const message = JSON.parse(messageOutput.body);
            console.log("--------받은 메시지:", message); // 디버그: 받은 메시지 로그

            setMessages((prevMessages) => [...prevMessages, message]);
          });
          resolve(client);
        },
        onStompError: (frame) => {
          reject(frame.body);
          console.log("--------WebSocket 연결 에러:", frame.body); // 디버그: WebSocket 연결 에러 로그
        },
      });
      client.activate();

      window.addEventListener('beforeunload', () => {
        if (client.active) {
          client.publish({
            destination: `/chat.removeUser/${roomId}`,
            body: JSON.stringify({ sender: nickname, type: 'LEAVE' }),
          });
          client.deactivate();
        }
      });
    });
  };

  const sendMessage = () => {
    if (stompClient && stompClient.active) {
      const chatMessage = {
        sender: nickname, // nickname 설정
        content: message,
        type: 'CHAT',
        roomId: roomId,
      };
      console.log("--------보낸 메시지:", chatMessage); // 디버그: 보낸 메시지 로그

      stompClient.publish({
        destination: `/chat/${roomId}`,
        body: JSON.stringify(chatMessage),
      });
      setMessages((prevMessages) => [...prevMessages, chatMessage]);
      setMessage('');
    } else {
      console.error('stomp 연결 또는 방 ID 없음');
      console.log("--------stomp 연결 또는 방 ID 없음"); // 디버그: stomp 연결 또는 방 ID 없음 로그
    }
  };

  return (
    <div className={styles.chatcontainer}>
      <h1>채팅하기</h1>
      <div className={styles.chatbox}>
        <div id="messages">
          {messages.map((msg, index) => (
            <div key={index} className={msg.sender === nickname ? styles.myMessage : styles.theirMessage}>
              {msg.type === 'JOIN' && <div>{msg.sender} 님이 입장하셨습니다.</div>}
              {msg.type === 'LEAVE' && <div>{msg.sender} 님이 나가셨습니다.</div>}
              {msg.type === 'CHAT' && <div>{msg.sender} 님 : {msg.content}</div>}
            </div>
          ))}
        </div>
      </div>
      <input id='input_msg'
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메시지 내용 입력"
      />
      <button className={styles.chatMsgSendBtn} onClick={sendMessage}>전송</button>
    </div>
  );
}

export default ChatCreatedRoom;