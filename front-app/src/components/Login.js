import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({ onLoginSuccess }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:9999/login', { id, pass: password }, { withCredentials: true });
      if (response.data === 'success') {
        console.log('로그인 요청 성공');
        onLoginSuccess(); // 로그인 성공 시 상위 컴포넌트의 상태 업데이트
        navigate('/');
      } else {
        alert('로그인 실패: ' + response.data);
      }
    } catch (error) {
      alert('로그인 실패: ' + error.message);
      console.error(error);
    }
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
    </div>
  );
}
