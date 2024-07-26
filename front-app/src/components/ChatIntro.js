import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createRoot } from 'react-dom/client'; // React 18에서 createRoot 사용
import ChatCreatedRoom from './ChatCreatedRoom'; // 컴포넌트 경로 수정
import styles from '../css/chatRoom.module.css'; // CSS 파일 경로 수정

function ChatIntro() {
  const [recipientId, setRecipientId] = useState('');
  const [searchCategory, setSearchCategory] = useState('id'); // 검색 기준 상태 변수, 기본값을 'id'로 설정
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userId, setUserId] = useState('');
  const [userNick, setUserNick] = useState(''); // 사용자 닉네임 추가

  // localStorage에서 사용자 정보를 가져와 설정하는 부분
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser && parsedUser.boardMemberId && parsedUser.boardMemberNick) {
        setUserId(parsedUser.boardMemberId);
        setUserNick(parsedUser.boardMemberNick); // 사용자 닉네임 설정
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
      console.log("--------검색 결과:", response.data); // 디버그: 검색 결과 로그
    } catch (error) {
      console.error('회원 검색 실패:', error.response ? error.response.data : error.message);
    }
  };

  const openChatRoom = (roomId, nickname) => {
    const chatWindow = window.open('', '_blank', 'width=600,height=800');
    chatWindow.document.write('<div id="chat-root"></div>');
    chatWindow.document.close();
    setTimeout(() => {
      const root = createRoot(chatWindow.document.getElementById('chat-root'));
      root.render(<ChatCreatedRoom roomId={roomId} nickname={nickname} />);
    }, 100);
  };

  const createRoom = () => {
    if (selectedUser) {
      const newRoomId = generateRoomId(userId, selectedUser.boardMemberId); // selectedUser.boardMemberId 사용
      console.log("--------방 생성 아이디:", newRoomId); // 중복된 로그 제거
      openChatRoom(newRoomId, userNick); // 로그인된 사용자 닉네임 전달
    } else {
      alert('회원 선택 후 방을 생성하세요.');
      console.log("--------회원 선택 안됨"); // 디버그: 회원 선택 안됨 로그
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
          <div key={user.boardMemberId} onClick={() => {
            setSelectedUser(user);
            console.log("--------선택된 회원:", user); // 디버그: 선택된 회원 로그
          }}>
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
