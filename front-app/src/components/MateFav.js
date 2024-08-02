// MateFav.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../css/mateFav.module.css'; 
import default_img from '../img/default_img.png';

export default function MateFav() {
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {     // 로그인 유저 정보
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

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:9999/mate/fav/list', {
          params: {
            loginId: userId,
          },
        });
        setFavorites(response.data.favorites || []);
      } catch (error) {
        console.error('즐겨찾기 목록을 불러오지 못했습니다.', error);
      }
    };

    if (userId) {
      fetchFavorites();
    }
  }, [userId]);

  return (
    <div>
      <h2>내 즐겨찾기 </h2>
      {favorites.length === 0 ? (
        <div>즐겨찾기한 회원이 없습니다.</div>
      ) : (
        <div className={styles.favoriteList}>
          {favorites.map((favorite) => (
            <div key={favorite.petId} className={styles.favoriteCard}>
              <img src={favorite.petImagePath || default_img} alt="Pet" />
              <div>이름: {favorite.boardMemberNick}</div>
              <div>나이: {favorite.petBirth}</div>
              <div>성별: {favorite.petGender}</div>
              <div>크기: {favorite.petSize}</div>
              <div>몸무게: {favorite.petWeight}</div>
              <div>소개: {favorite.petInfo}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
