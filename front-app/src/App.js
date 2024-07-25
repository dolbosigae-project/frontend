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
import PL from './components/pl_main_components/contents/PL'
import PlInfoView from './components/pl_info_component/PlInfoView'
import ShelterList from './components/ShelterList';
import Hospital from './components/Hospital';
import HospitalDetail from './components/HospitalDetail';
import AdminContact from './components/AdminContact';
import AdminContactNormalTableDetail from './components/AdminContactNormalTableDetail';
import AdminContactWrite from './components/AdminContactWrite';
import Footer from './components/Footer';
import IoChat from './components/IoChat';
import ChatIntro from './components/ChatIntro';
import MateSearch from './components/MateSearch';
import MatePetProfile from './components/MatePetProfile';

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
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
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
          <Route path="/pl"  element={<PL/>} />
          <Route path='/plinfo/:plId' element={<PlInfoView />} />
          <Route path='/shelter' element={<ShelterList/>} />
          <Route path='/animal-medical' element={<Hospital />} />
          <Route path='hospitalDetail' element={<HospitalDetail />}/>
          <Route path='/admin/contact' element={<AdminContact />} />
          <Route path='/admin/contact/detail/:adminNo' element={<AdminContactNormalTableDetail />} />
          <Route path='/admin/write' element={<AdminContactWrite />} />
          <Route path="/mate/chat" element={<IoChat/>} />
          <Route path="/mate/intro" element={<ChatIntro/>} />
          <Route path="/mate/member" element={<MateSearch/>} />
          <Route path="/mate/petinfo" element={<MatePetProfile/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;