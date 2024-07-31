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
import PL from './components/pl_main_components/PL';
import PlInfoView from './components/pl_info_component/PlInfoView';
import Hospital from './components/Hospital';
import HospitalDetail from './components/HospitalDetail';
import AdminContact from './components/AdminContact';
import AdminContactNormalTableDetail from './components/AdminContactNormalTableDetail';
import AdminContactWrite from './components/AdminContactWrite';
import Footer from './components/Footer';
import ChatIntro from './components/ChatIntro';
import MateSearch from './components/MateSearch';
import MatePetProfile from './components/MatePetProfile';
import Pharmacy from './components/Pharmacy';
import PharmacyDetail from './components/PharmacyDetail';
import PlInsert from './components/pl_insert_component/PlInsert';
import CoInsert from './components/co_insert_component/CoInsert';
import DogWorldCup from './components/dog_worldCup_components/DogWorldCup';
import AddHospital from './components/AddHospital';
import AddPharmacy from './components/AddPharmacy';
import CO from './components/co_main_components/CO';
import CoInfoView from './components/co_info_components/CoInfoView';
import DogRandomDate from './components/DogRandomDate';
import MsgBox from './components/MsgBox';
import MsgSend from './components/MsgSend';
import ChatCreatedRoom from './components/ChatCreatedRoom';
import Board from './components/Board';

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
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/login/passwd" element={<LoginPasswd />} />
            <Route path="/member/view" element={<MemberView />} />
            <Route path="/member/register" element={<MemberRegister />} />
            <Route path="/member/mypage" element={<MyPage />} />
            <Route path="/pl" element={<PL />} />
            <Route path='/plinfo/:plId' element={<PlInfoView />} />
            <Route path='/plInsert' element={<PlInsert />} />
            <Route path='/co' element={<CO />} />
            <Route path='/coinfo/:coId' element={<CoInfoView />} />
            <Route path='/coInsert' element={<CoInsert />} />
            <Route path='/animal-medical' element={<Hospital />} />
            <Route path='/hoinfo/:hoId' element={<HospitalDetail />} />
            <Route path="/pharmacies" element={<Pharmacy />} />
            <Route path="/phinfo/:phId" element={<PharmacyDetail />} />
            <Route path='/dwc' element={<DogWorldCup />} />
            <Route path='/hospitalDetail' element={<HospitalDetail />} />
            <Route path='/admin/contact' element={<AdminContact />} />
            <Route path='/admin/contact/detail/:adminNo' element={<AdminContactNormalTableDetail />} />
            <Route path='/admin/write' element={<AdminContactWrite />} />
            <Route path='/dog/random/date' element={<DogRandomDate />} />
            <Route path='/co' element={<CO />} />
            <Route path='/coinfo/:coId' element={<CoInfoView />} />
            <Route path='/pharmacies' element={<Pharmacy />} />
            <Route path='/phinfo/:phId' element={<PharmacyDetail />} />
            <Route path="/addHospital" element={<AddHospital />} />
            <Route path="/addPharmacy" element={<AddPharmacy />} />
            <Route path="/mate/msg" element={<MsgBox/>} />
            <Route path="/mate/sendMsg" element={<MsgSend/>} />
            <Route path="/mate/chat" element={<ChatCreatedRoom />} />
            <Route path="/mate/intro" element={<ChatIntro />} />
            <Route path="/mate/member" element={<MateSearch />} />
            <Route path="/mate/petinfo" element={<MatePetProfile />} />
            <Route path='/board' element={<Board />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;