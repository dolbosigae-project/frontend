import React from "react";
import kakaoIcon from '../img/kakaotalk_icon.png';
import kakaoLogin from '../img/kakao_login_large_wide.png';

export default function KakaoLogin() {
  const handleKakaoLogin = () => {
    window.location.href = 'http://localhost:9999/kakao';
  }

  return (
    <div>
      <h2>카카오/네이버 로그인</h2>
      <p>회원가입된 회원은 카카오/네이버를 통해 로그인 하실 수 있습니다.</p>
      <img src={kakaoIcon} alt="kakaoIcon" /><br/>
      <img
        src={kakaoLogin}
        alt="kakaoLogin"
        onClick={handleKakaoLogin} 
      />
    </div>
  );
}
