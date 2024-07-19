// KakaoLogin.js
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import kakaoIcon from '../img/kakaotalk_icon.png';
import kakaoLogin from '../img/kakao_login_large_wide.png';
import style from './../css/kakaoLogin.module.css';

export default function KakaoLogin({ onLoginSuccess }) {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    window.location.href = 'http://localhost:9999/kakao';
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      fetch(`http://localhost:9999/kakao/callback?code=${code}`)
        .then(response => response.json())
        .then(data => {
          if (data.status === 'success') {
            localStorage.setItem('user', JSON.stringify(data)); // 사용자 정보 로컬 스토리지에 저장
            onLoginSuccess();
            navigate('/');
          } else {
            navigate('/login?loginSuccess=false');
          }
        })
        .catch(error => {
          console.error('Error during Kakao callback handling:', error);
          navigate('/login?loginSuccess=false');
        });
    }
  }, [navigate, onLoginSuccess]);

  return (
    <div className={style.container}>
      <h2>카카오/네이버 로그인</h2>
      <p>회원가입된 회원은 카카오/네이버를 통해 로그인 하실 수 있습니다.</p>
      <div className={style.imgs}>
        <img src={kakaoIcon} alt="kakaoIcon" /><br/>
      </div>  
      <img
        src={kakaoLogin}
        alt="kakaoLogin"
        onClick={handleKakaoLogin} 
        className={style.kakaobtn}
      />
    </div>
  );
}
