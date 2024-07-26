import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom'; // ReactDOM 임포트 추가
import Chat from './ChatCreatedRoom'; // IoChat 임포트 추가
import styles from '../css/chatRoom.module.css';

function ChatIntro() {
  const [recipientId, setRecipientId] = useState('');
  const [searchCategory, setSearchCategory] = useState('id'); // 검색 기준 상태 변수, 기본값을 'id'로 설정
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userId, setUserId] = useState('');

  // localStorage에서 사용자 정보를 가져와 설정하는 부분
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
      console.log('검색 결과:', response.data); // 검색 결과 로그 추가
    } catch (error) {
      console.error('회원 검색 실패:', error.response ? error.response.data : error.message);
    }
  };

  const openChatRoom = (roomId, nickname) => {
    const chatWindow = window.open('', '_blank', 'width=600,height=800');
    chatWindow.document.write('<div id="chat-root"></div>');
    chatWindow.document.close();
    // 새로운 창에 ReactDOM을 사용하여 IoChat 컴포넌트 렌더링
    setTimeout(() => {
      ReactDOM.render(<Chat roomId={roomId} nickname={nickname} />, chatWindow.document.getElementById('chat-root'));
    }, 100);
  };

  const createRoom = () => {
    if (selectedUser) {
      const newRoomId = generateRoomId(userId, selectedUser.id);
      console.log(`이 아이디로 방이 생성됨: ${newRoomId}`); // 방 생성 콘솔 로그 추가
      openChatRoom(newRoomId, selectedUser.nickname);
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
          <option value="nickname">닉네임</option>
        </select>
        <button className={styles.chatSearchBtn} onClick={searchUsers}>
          회원 검색
        </button>
      </div>
      <div className={styles.searchResults}>
        {searchResults.map((user) => (
          <div key={user.id} onClick={() => {
            setSelectedUser(user);
          }}>
            {user.nickname} ({user.id})
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
