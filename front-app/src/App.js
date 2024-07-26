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
import ShelterDetail from './components/ShelterDetail';  // ShelterDetail import 추가
import Hospital from './components/Hospital';
import HospitalDetail from './components/HospitalDetail';
import ABList from './components/ABList';

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
        <Routes>
          <Route path='/shelters' element={<ShelterList />} />
          <Route path='/shelters/detail/:shID' element={<ShelterDetail />} /> 
          <Route path='/ab' element={<ABList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
