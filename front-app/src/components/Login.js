import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import kakaoIcon from '../img/kakaotalk_icon.png';
import kakaoLogin from '../img/kakao_login_large_wide.png';

export default function Login({ onLoginSuccess }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:9999/login', { id, pass: password }, { withCredentials: true });
      if (response.data === 'success') {
        alert('로그인하였습니다.');
        onLoginSuccess(); // 로그인 성공 시 상위 컴포넌트의 상태 업데이트
        navigate('/');
      } else {
        alert('로그인에 실패하였습니다.');
      }
    } catch (error) {
      alert('로그인에 실패하였습니다.');
      console.error(error);
    }
  }

  const handleKakaoLogin = () => {
    window.location.href = 'http://localhost:9999/kakao';
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>회원 로그인</h2>
        <input
          type="text"
          placeholder="아이디 입력"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div>
          <button type="submit">로그인</button>
          <a onClick={() => navigate('/register')}>회원가입</a>
        </div>
      </form>
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
    </div>
  );
}
