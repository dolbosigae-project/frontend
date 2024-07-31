import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createRoot } from 'react-dom/client';
import ChatCreatedRoom from './ChatCreatedRoom';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import styles from '../css/chatRoom.module.css';

function ChatIntro() {
  const [recipientId, setRecipientId] = useState('');
  const [searchCategory, setSearchCategory] = useState('id');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userId, setUserId] = useState('');
  const [clickToggleActive, setClickToggleActive] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const [chatRoom, setChatRoom] = useState(null); // 채팅방 상태 추가

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

    // WebSocket 연결 설정
    const socket = new SockJS('http://localhost:9999/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {},
      onConnect: () => {
        console.log('WebSocket 연결 완료');
        setStompClient(client);
      },
      onStompError: (frame) => {
        console.error('WebSocket 연결 에러:', frame);
      },
    });

    client.activate();

    return () => {
      if (client && client.active) {
        client.deactivate();
      }
    };
  }, []);

  const handleRecipientChange = (event) => {
    setRecipientId(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  const searchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:9999/member/search', {
        params: {
          category: searchCategory === 'nickname' ? '회원이름' : '회원ID',
          term: recipientId,
        },
      });
      setSearchResults(response.data);
      console.log("검색 결과:", response.data);
    } catch (error) {
      console.error('회원 검색 실패:', error.response ? error.response.data : error.message);
    }
  };

  const openChatRoom = (roomId, nickname) => {
    setChatRoom({ roomId, nickname }); // 채팅방 상태 업데이트
  };

  const createRoom = () => {
    if (selectedUser) {
      const newRoomId = generateRoomId(userId, selectedUser.boardMemberId);
      
      // WebSocket을 통해 방 생성 메시지 전송
      if (stompClient && stompClient.connected) {
        const chatMsg = {
          sender: userId,
          receiver: selectedUser.boardMemberId,
          content: "채팅방 생성 요청",
          type: "CREATE",
        };

        stompClient.publish({
          destination: `/ChatCreatedRoom/chat.createRoom/${newRoomId}`,
          body: JSON.stringify(chatMsg),
        });

        // 메시지가 성공적으로 전송된 후 로그를 출력
        console.log(`방 생성 요청 메시지 전송됨: ${newRoomId}`);
        
        // WebSocket 응답을 처리하기 위한 구독
        stompClient.subscribe(`/topic/${newRoomId}`, (message) => {
          const response = JSON.parse(message.body);
          if (response && response.type === 'CREATE') {
            console.log(`이 아이디로 방이 생성됨: ${newRoomId}`);
            openChatRoom(newRoomId, selectedUser.boardMemberNick);
          }
        });
      } else {
        console.error('WebSocket 연결이 활성화되지 않았습니다.');
      }
    } else {
      alert('회원 선택 후 방을 생성하세요.');
    }
  };

  const generateRoomId = (userA, userB) => {
    return userA.localeCompare(userB) < 0 ? `${userA}-${userB}` : `${userB}-${userA}`;
  };

  const toggleActive = (userId) => {
    setClickToggleActive(clickToggleActive === userId ? null : userId);
    setSelectedUser(searchResults.find(user => user.boardMemberId === userId));
  };

  return (
    <div className={styles.chatIntroContainer}>
      {chatRoom ? (
        <ChatCreatedRoom roomId={chatRoom.roomId} nickname={chatRoom.nickname} />
      ) : (
        <>
          <div>
            <input
              type="text"
              placeholder="수신자 ID 또는 닉네임 입력"
              value={recipientId}
              onChange={handleRecipientChange}
              className={styles.searchInput}
            />
            <select value={searchCategory} onChange={handleCategoryChange} className={styles.searchSelect}>
              <option value="id" className={styles.chatIntroOption}>ID</option>
              <option value="nickname" className={styles.chatIntroOption}>닉네임</option>
            </select>
            <button className={styles.chatSearchBtn} onClick={searchUsers}>
              회원 검색
            </button>
          </div>
          <div className={styles.searchResults}>
            {searchResults.map((user) => (
              <div
                key={user.boardMemberId}
                onClick={() => toggleActive(user.boardMemberId)}
                className={`${styles.chatIntroResultString} ${clickToggleActive === user.boardMemberId ? styles.active : ''}`}
              >
                {user.boardMemberNick} ({user.boardMemberId})
              </div>
            ))}
          </div>
          <div>
            <button className={styles.chatRequestBtn} onClick={createRoom}>
              상대방과 채팅하기
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ChatIntro;
