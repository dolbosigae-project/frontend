import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../css/msgSend.module.css';

function MsgSend() {
  const [receiverId, setReceiverId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [clickToggleActive, setClickToggleActive] = useState(null);

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

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:9999/member/search', {
        params: {
          category: '회원ID',
          term: searchTerm,
        },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('회원 검색 중 오류 발생:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!selectedUser) {
      alert('메시지를 보낼 수신자를 선택하세요.');
      return;
    }

    const message = {
      sId: userId,
      rId: selectedUser.boardMemberId,
      title: title,
      content: content
    };

    try {
      await axios.post('http://localhost:9999/msg/send', message, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('쪽지가 성공적으로 전송되었습니다.');
      setReceiverId('');
      setTitle('');
      setContent('');
      setSearchTerm('');
      setSearchResults([]);
      setSelectedUser(null);
    } catch (error) {
      console.error('쪽지 전송 중 오류 발생:', error);
      alert('쪽지 전송 중 오류가 발생했습니다.');
    }
  };

  const selectUser = (user) => {
    setSelectedUser(user);
    setSearchTerm(`${user.boardMemberNick} (${user.boardMemberId})`);
  };

  const toggleActive = (userId) => {
    setClickToggleActive(clickToggleActive === userId ? null : userId);
    setSelectedUser(searchResults.find(user => user.boardMemberId === userId));
  };

  return (
    <div className={styles.msgSendContainer}>
      <h1 className={styles.msgSendHeader}>쪽지 보내기</h1>
      <div className={styles.msgSendForm}>
        <label htmlFor="searchTerm">회원 검색</label>
        <input
          type="text"
          id="searchTerm"
          placeholder="수신자 ID 입력"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.msgSendInput}
        />
        <button onClick={handleSearch} className={styles.msgSendButton}>검색</button>
        <ul className={styles.searchResults}>
          {searchResults.map((user) => (
            <li
              key={user.boardMemberId}
              onClick={() => toggleActive(user.boardMemberId)}
              className={`${styles.searchResultItem} ${clickToggleActive === user.boardMemberId ? styles.active : ''}`}
            >
              {user.boardMemberNick} ({user.boardMemberId})
            </li>
          ))}
        </ul>
        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.msgSendInput}
        />
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.msgSendTextarea}
        ></textarea>
        <button onClick={handleSendMessage} className={styles.msgSendButton}>전송</button>
      </div>
    </div>
  );
}

export default MsgSend;