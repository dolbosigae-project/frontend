import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../css/matePetProfile.module.css'; 
import default_img from '../img/default_img.png';

export default function PetProfile() { 
  const [petProfile, setPetProfile] = useState(null);

  // URL에서 userId 파라미터 추출
  const queryParams = new URLSearchParams(window.location.search);
  const userId = queryParams.get('userId');

  useEffect(() => {
    const readData = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:9999/member/petprofile/${userId}`);
          setPetProfile(response.data);
        } catch (error) {
          console.error('정보를 불러오지 못했습니다.', error);
        }
      } else {
        console.error('사용자 ID를 찾을 수 없습니다.');
      }
    };
    readData();
  }, [userId]);

  return (
    <div>
      {!petProfile ? (
        <div>데이터 가져오는 중</div>
      ) : (
        <div className={styles.petContainer}>
          <div className={styles.petTable}>
            <img src={petProfile.petImagePath || default_img} alt="Pet" />
            <div>이름: {petProfile.boardMemberNick}</div>
            <div>나이: {petProfile.petBirth}</div>
            <div>성별: {petProfile.petGender}</div>
            <div>크기: {petProfile.petSize}</div>
            <div>몸무게: {petProfile.petWeight}</div>
            <div>소개: {petProfile.petInfo}</div>
          </div>
        </div>
      )}
    </div>
  );
}
