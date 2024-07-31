import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../css/msgSend.module.css';

function MsgSend() {
  const [userId, setUserId] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [searchCategory, setSearchCategory] = useState('id');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [msgContent, setMsgContent] = useState('');
  const [msgTitle, setMsgTitle] = useState('');

  
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
      console.log("검색 결과:", response.data);
    } catch (error) {
      console.error('회원 검색 실패:', error.response ? error.response.data : error.message);
    }
  };

  const handleSendMsg = async () => {
    if (!selectedUser || !msgContent || !msgTitle) {
      alert('회원 선택 및 메시지 제목과 내용을 입력하세요.');
      return;
    }

    try {
      const messageData = {
        mIdFrom: userId,
        mIdTo: selectedUser.boardMemberId,
        msgTitle: msgTitle,
        msgContent: msgContent,
      };
      console.log('보낼 메시지 데이터:', messageData);
      await axios.post('http://localhost:9999/msg/sendMsg', messageData);
      alert('메시지가 성공적으로 전송되었습니다.');
      setMsgContent('');
      setMsgTitle('');
    } catch (error) {
      console.error('메시지 전송 중 오류 발생:', error.response ? error.response.data : error.message);
      alert('메시지 전송 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className={styles.msgSendContainer}>
      <h2 className={styles.msgSendHeader}>쪽지 쓰기</h2>
      <div className={styles.msgSendSearch}>
        <input
          type="text"
          placeholder="수신자 ID 또는 닉네임 입력"
          value={recipientId}
          onChange={handleRecipientChange}
        />
        <select value={searchCategory} onChange={handleCategoryChange}>
          <option value="id">ID</option>
        </select>
        <button className={styles.msgSendButton} onClick={searchUsers}>
          회원 검색
        </button>
      </div>
      <div className={styles.msgSendSearchResults}>
        {searchResults.map((user) => (
          <div key={user.boardMemberId} onClick={() => setSelectedUser(user)} className={styles.msgSendUser}>
            {user.boardMemberNick} ({user.boardMemberId})
          </div>
        ))}
      </div>
      <div className={styles.msgSendForm}>
        <input
          type="text"
          value={msgTitle}
          onChange={(e) => setMsgTitle(e.target.value)}
          placeholder="메시지 제목 입력"
          className={styles.msgSendInput}
        />
        <textarea
          value={msgContent}
          onChange={(e) => setMsgContent(e.target.value)}
          placeholder="메시지 내용 입력"
          rows="4"
          className={styles.msgSendTextarea}
        />
        <button className={styles.msgSendButton} onClick={handleSendMsg}>
          메시지 보내기
        </button>
      </div>
    </div>
  );
}

export default MsgSend;
