import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../css/mateFav.module.css'; 
import default_img from '../img/default_img.png';

export default function MateFav() {
  const [favorites, setFavorites] = useState([]);
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

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // 즐겨찾기 목록을 가져옵니다
        const response = await axios.get('http://localhost:9999/mate/fav/list', {
          params: {
            id: userId,
          },
        });
        const favoritesArray = response.data.split(','); // 응답 데이터를 ,로 분리하여 배열로 변환
        
        // 즐겨찾기 목록의 회원 상세 정보를 가져옵니다
        const membersResponse = await axios.get('http://localhost:9999/member/walkmates', {
          params: {
            ids: favoritesArray.join(','), // 여러 ID를 ,로 구분하여 전달
          },
        });
        setFavorites(membersResponse.data.members); // 상세 정보를 설정
      } catch (error) {
        console.error('즐겨찾기 목록을 불러오지 못했습니다.', error);
      }
    };

    if (userId) {
      fetchFavorites();
    }
  }, [userId]);

  const handleMateClick = (id) => {
    const url = `/mate/petinfo?userId=${id}`; // PetProfile 페이지의 URL에 ID를 쿼리 파라미터로 포함
    const windowFeatures = 'width=500,height=650,left=100,top=100,toolbar=no';
    window.open(url, '_blank', windowFeatures); // 새 창으로 열기
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>내 즐겨찾기</h2>
        <p>이미지를 클릭하시면 상세 정보를 볼 수 있습니다.</p>
      </div>
      {favorites.length === 0 ? (
        <div>즐겨찾기한 회원이 없습니다.</div>
      ) : (
        <ul className={styles.favoriteList}>
          {favorites.map((favorite, index) => (
            <li key={index} className={styles.favoriteItem} onClick={() => handleMateClick(favorite.boardMemberId)}>
              <img 
                src={favorite.petImagePath || default_img} 
                alt={`Pet of ${favorite.boardMemberNick}`} 
                className={styles.favoriteImage}
              />
              <div className={styles.favoriteInfo}>
                <span className={styles.favoriteName}>{favorite.boardMemberNick}</span>
                <span className={styles.favoriteId}>{favorite.boardMemberId}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
