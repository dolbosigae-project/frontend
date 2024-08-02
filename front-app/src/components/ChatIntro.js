import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createRoot } from 'react-dom/client'; // React 18 API import
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
  }, []);

   // 채팅 요청을 수신하는 로직 추가
   useEffect(() => {
    if (!stompClient || !stompClient.active) return;

    // /user/queue/chat 경로를 구독하여 채팅 요청 메시지를 수신
    const subscription = stompClient.subscribe('/user/queue/chat', (message) => {
      const chatRequest = JSON.parse(message.body);
      console.log('채팅 요청 수신:', chatRequest);

      // 채팅 요청 처리 로직 추가
      alert(`${chatRequest.sender}님으로부터 채팅 요청이 도착했습니다.`);
      // 필요에 따라 요청을 자동으로 수락하거나, 사용자가 수락하도록 할 수 있습니다.
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [stompClient]);

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
    const url = `/mate/chat?roomId=${roomId}&nickname=${nickname}`; // URL 확인
    const chatWindow = window.open(url, '_blank', 'width=600,height=800');

    if (chatWindow) {
      chatWindow.document.write('<div id="chat-root"></div>');
      chatWindow.document.close();

      const linkElement = chatWindow.document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.href = '/static/css/chatRoom.module.css';
      chatWindow.document.head.appendChild(linkElement);

      linkElement.onload = () => {
        console.log('CSS 로드 완료');
        const root = createRoot(chatWindow.document.getElementById('chat-root')); // React 18 API 사용
        root.render(<ChatCreatedRoom roomId={roomId} nickname={nickname} />);
      };

      linkElement.onerror = () => {
        console.error('CSS 로드 실패');
      };
    } else {
      console.error('새 창을 열 수 없습니다. 팝업 차단기를 확인하세요.');
    }
  };

  const createRoom = () => {
    if (selectedUser) {
      if (stompClient && stompClient.active) { // 연결 상태 확인
        const newRoomId = generateRoomId(userId, selectedUser.boardMemberId);
        console.log(`이 아이디로 방이 생성됨: ${newRoomId}`);
        console.log("방 생성:", newRoomId);
  
        // 방 생성 요청 메시지
        const chatMsg = {
          sender: userId,
          receiver: selectedUser.boardMemberId,
          content: "채팅방 생성 요청",
          type: "CREATE",
        };
  
        // 상대방에게 채팅 요청 메시지 전송
        stompClient.publish({
          destination: `/ChatCreatedRoom/chat.request/${selectedUser.boardMemberId}`,
          body: JSON.stringify(chatMsg),
        });
        console.log("방 생성 메시지 전송됨:", chatMsg);
  
        // 채팅 방을 오픈
        openChatRoom(newRoomId, selectedUser.boardMemberNick);
      } else {
        console.error('STOMP 연결이 되어 있지 않습니다. 다시 시도해 주세요.');
        alert('STOMP 연결이 되어 있지 않습니다. 다시 시도해 주세요.');
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
    </div>
  );
}

export default ChatIntro;
