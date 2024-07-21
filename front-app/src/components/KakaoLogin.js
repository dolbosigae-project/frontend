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
    console.log('useEffect executed'); // useEffect 실행 여부 확인

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log('Code:', code);

    if (code) {
      console.log('Fetching data with code:', code); // Fetch 요청 전 콘솔 로그
      fetch(`http://localhost:9999/kakao/callback?code=${code}`)
        .then(response => {
          console.log('Response:', response);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Data:', data); // 데이터 구조 확인
          if (data.status === 'success') {
            localStorage.setItem('user', JSON.stringify(data)); // 사용자 정보 로컬 스토리지에 저장
            if (typeof onLoginSuccess === 'function') {
              onLoginSuccess();
            }
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
  }, [navigate, onLoginSuccess]); // useEffect 의존성 배열에 필요한 값들을 추가합니다.

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
