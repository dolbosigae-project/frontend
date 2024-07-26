import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import MemberView from './components/MemberView';
import MemberRegister from './components/MemberRegister';
import MyPage from './components/MyPage';
import LoginPasswd from './components/LoginPasswd';
import KakaoLogin from './components/KakaoLogin';
import ShelterList from './components/ShelterList';
import ShelterDetail from './components/ShelterDetail';
import ABList from './components/ABList';
import ABDetail from './components/ABDetail';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="app-container">
        {/* <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} /> */}
        <main className="app-content">
          <Routes>
            {/* <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/login/passwd" element={<LoginPasswd />} />
            <Route path="/member/view" element={<MemberView />} />
            <Route path="/member/register" element={<MemberRegister />} />
            <Route path="/member/mypage" element={<MyPage />} />
            <Route path="/kakao/callback" element={<KakaoLogin onLoginSuccess={handleLoginSuccess} />} /> */}
            <Route path="/shelters" element={<ShelterList />} />
            <Route path='/shelters/detail/:sh_id' element={<ShelterDetail />} />
            <Route path='/ab' element={<ABList/>} />
            <Route path='/ab/detail/:ab_id' element={<ABDetail/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
