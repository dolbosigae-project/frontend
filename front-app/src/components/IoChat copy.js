import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import styles from '../css/IoChat.module.css';

function IoChat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [nickname, setNickname] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const [userId, setUserId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [recipientId, setRecipientId] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log('현재 회원의 정보:', parsedUser);
      if (parsedUser && parsedUser.boardMemberId) {
        setNickname(parsedUser.boardMemberNick);
        setUserId(parsedUser.boardMemberId);
      }
    } else {
      console.error('로그인된 사용자가 없습니다.');
    }
  }, []);

  const connectWebSocket = (roomId) => {
    return new Promise((resolve, reject) => {
      const client = new Client({
        brokerURL: 'ws://localhost:9999/ws',
        connectHeaders: {},
        webSocketFactory: () => new SockJS('http://localhost:9999/ws'),
        onConnect: (frame) => {
          console.log('Connected: ' + frame);
          setStompClient(client);

          client.subscribe(`/topic/${roomId}`, (messageOutput) => {
            const message = JSON.parse(messageOutput.body);
            console.log('메시지 수신됨: ', message);
            setMessages((prevMessages) => [...prevMessages, message]);
          });

          resolve(client);
        },
        onStompError: (frame) => {
          console.error('Broker reported error: ' + frame.headers['message']);
          console.error('Additional details: ' + frame.body);
          reject(frame.body);
        },
      });

      client.activate();

      window.addEventListener('beforeunload', () => {
        if (client.active) {
          client.publish({
            destination: `/IoChat/chat.removeUser/${roomId}`,
            body: JSON.stringify({ sender: nickname, type: 'LEAVE' }),
          });
          client.deactivate();
        }
      });
    });
  };

  const createRoom = async () => {
    if (recipientId) {
      const newRoomId = generateRoomId(userId, recipientId);
      setRoomId(newRoomId);

      try {
        const client = await connectWebSocket(newRoomId);
        setStompClient(client);
        client.publish({
          destination: `/IoChat/chat.createRoom/${userId}/${recipientId}`,
          body: JSON.stringify({ sender: nickname, type: 'JOIN' }),
        });
        console.log('방 생성 요청 전송됨: ', newRoomId);
      } catch (error) {
        console.error('방 생성 실패:', error);
      }
    } else {
      alert('수신자 ID를 입력하세요.');
    }
  };

  const acceptInvite = () => {
    if (stompClient && stompClient.active) {
      stompClient.publish({
        destination: `/IoChat/chat.acceptInvite/${roomId}/${userId}`,
        body: JSON.stringify({ sender: nickname, type: 'JOIN' }),
      });
      console.log('초대 수락 요청 전송됨: ', roomId);
    }
  };

  const rejectInvite = () => {
    if (stompClient && stompClient.active) {
      stompClient.publish({
        destination: `/IoChat/chat.rejectInvite/${roomId}/${userId}`,
        body: JSON.stringify({ sender: nickname, type: 'LEAVE' }),
      });
      console.log('초대 거절 요청 전송됨: ', roomId);
    }
  };

  const sendMessage = () => {
    if (stompClient && stompClient.active) {
      const chatMessage = {
        sender: nickname,
        content: message,
        type: 'CHAT',
        roomId: roomId,
      };
      stompClient.publish({
        destination: `/IoChat/chat/${roomId}`,
        body: JSON.stringify(chatMessage),
      });
      setMessages((prevMessages) => [...prevMessages, chatMessage]);
      setMessage('');
      console.log('메시지 전송됨: ', chatMessage);
    } else {
      console.error('stomp 연결 또는 방 ID 없음');
    }
  };

  const handleRecipientChange = (event) => {
    setRecipientId(event.target.value);
  };

  const generateRoomId = (userA, userB) => {
    return (userA.localeCompare(userB) < 0) ? `${userA}-${userB}` : `${userB}-${userA}`;
  };

  return (
    <div className={styles.chatcontainer}>
      <h1>채팅하기</h1>
      <div>
        <input 
          type="text" 
          placeholder="수신자 ID 입력" 
          value={recipientId} 
          onChange={handleRecipientChange} 
        />
        <button className={styles.chatRequestBtn} onClick={createRoom}>상대방과 채팅하기</button>
      </div>
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
      <div>
        <button className={styles.chatRequestYesBtn} onClick={acceptInvite}>초대 수락</button>
        <button className={styles.chatRequestNoBtn} onClick={rejectInvite}>초대 거절</button>
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

export default IoChat;
