import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import MemberView from './components/MemberView';
import MemberRegister from './components/MemberRegister';
import MyPage from './components/MyPage';
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
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/member/view" element={<MemberView/>} />
          <Route path="/member/register" element={<MemberRegister/>} />
          <Route path="/member/mypage" element={<MyPage/>} />
          <Route path="/mate/chat" element={<IoChat/>} />
          <Route path="/mate/intro" element={<ChatIntro/>} />
          <Route path="/mate/member" element={<MateSearch/>} />
          <Route path="/mate/petinfo" element={<MatePetProfile/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
