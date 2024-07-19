import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import Hospital from './components/Hospital';
import MemberView from './components/MemberView';
import MemberRegister from './components/MemberRegister';
import HospitalDetail from './components/HospitalDetail';
import MyPage from './components/MyPage';
import LoginPasswd from './components/LoginPasswd';
import KakaoLogin from './components/KakaoLogin';
import PL from './components/pl_main_components/PL';
import PlInfoView from './components/pl_info_component/PlInfoView';

function App() {
  // 로그인 성공 처리 함수 정의
  const handleLoginSuccess = () => {
    // 로그인 성공 후 할 일을 정의합니다.
    console.log('Login Success');
    // 예: 다른 페이지로 리다이렉트 또는 상태 업데이트 등
  };

  return (
    <Router>
      <div>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/login/passwd" element={<LoginPasswd />} />
          <Route path="/member/view" element={<MemberView />} />
          <Route path="/member/register" element={<MemberRegister />} />
          <Route path="/member/mypage" element={<MyPage />} />
          <Route path="/kakao/callback" element={<KakaoLogin onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/pl" element={<PL />} />
          <Route path='/plinfo/:plId' element={<PlInfoView />} />
          <Route path="/animal-medical" element={<Hospital />} />
          <Route path="/hospitalDetail" element={<HospitalDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => <div>Home Page</div>;
export default App;
