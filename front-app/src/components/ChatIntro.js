import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import ChatCreatedRoom from './ChatCreatedRoom';
import styles from '../css/chatRoom.module.css';

function ChatIntro() {
  const [recipientId, setRecipientId] = useState('');
  const [searchCategory, setSearchCategory] = useState('id');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userId, setUserId] = useState('');

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
      console.log("--------검색 결과:", response.data);
    } catch (error) {
      console.error('회원 검색 실패:', error.response ? error.response.data : error.message);
    }
  };

  const openChatRoom = (roomId, nickname) => {
    const url = `/chatRoom?roomId=${roomId}&nickname=${nickname}`; //새 창에서 열릴 ulr 경로
    const chatWindow = window.open(url, '_blank', 'width=600,height=800');
    chatWindow.document.write('<div id="chat-root"></div>');
    chatWindow.document.close();

    // 새로운 창에 CSS를 동적으로 추가
    const linkElement = chatWindow.document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = '/static/css/chatRoom.module.css'; // CSS 파일 경로를 맞춰주세요.
    chatWindow.document.head.appendChild(linkElement);
    
    setTimeout(() => {
      ReactDOM.render(<ChatCreatedRoom roomId={roomId} nickname={nickname} />, chatWindow.document.getElementById('chat-root'));
    }, 100);
  };

  const createRoom = () => {
    if (selectedUser) {
      const newRoomId = generateRoomId(userId, selectedUser.boardMemberId);
      console.log(`이 아이디로 방이 생성됨: ${newRoomId}`);
      console.log("--------방 생성:", newRoomId);
      openChatRoom(newRoomId, selectedUser.boardMemberNick);
    } else {
      alert('회원 선택 후 방을 생성하세요.');
    }
  };

  const generateRoomId = (userA, userB) => {
    return userA.localeCompare(userB) < 0 ? `${userA}-${userB}` : `${userB}-${userA}`;
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="수신자 ID 또는 닉네임 입력"
          value={recipientId}
          onChange={handleRecipientChange}
        />
        <select value={searchCategory} onChange={handleCategoryChange}>
          <option value="id">ID</option>
        </select>
        <button className={styles.chatSearchBtn} onClick={searchUsers}>
          회원 검색
        </button>
      </div>
      <div className={styles.searchResults}>
        {searchResults.map((user) => (
          <div key={user.boardMemberId} onClick={() => setSelectedUser(user)}>
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
