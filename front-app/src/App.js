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
import PL from './components/pl_main_components/contents/PL';
import PlInfoView from './components/pl_info_component/PlInfoView';
import ShelterList from './components/ShelterList';
import ShelterAnimalsInfo from './components/ShelterAnimalsInfo';
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
import Board from './components/Board';
import AB from './components/AB';
import Shelter from './components/Shelter';
import ShelterDetail from './components/ShelterDetail';
import ABDetail from './components/ABDetail';
import BoardWrite from './components/BoardWrite';
import BoardDetail from './components/BoardDetail';

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
            <Route path="/kakao/callback" element={<KakaoLogin onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/pl" element={<PL />} />
            <Route path='/plinfo/:plId' element={<PlInfoView />} />
            <Route path='/plInsert' element={<PlInsert />} />
            <Route path='/co' element={<CO />} />
            <Route path='/coinfo/:coId' element={<CoInfoView />} />
            <Route path='/coInsert' element={<CoInsert />} />
            <Route path='/shelter' element={<ShelterList />} />
            <Route path='/shelter/animal' element={<ShelterAnimalsInfo />} />
            <Route path='/animal-medical' element={<Hospital />} />
            <Route path='/hoinfo/:hoId' element={<HospitalDetail />} />
            <Route path="/pharmacies" element={<Pharmacy />} />
            <Route path="/phinfo/:phId" element={<PharmacyDetail />} />
            <Route path='/dwc' element={<DogWorldCup />} />
            <Route path="/addHospital" element={<AddHospital />} />
            <Route path="/addPharmacy" element={<AddPharmacy />} />
            <Route path="/mate/chat" element={<IoChat />} />
            <Route path="/mate/intro" element={<ChatIntro />} />
            <Route path="/mate/member" element={<MateSearch />} />
            <Route path="/mate/petinfo" element={<MatePetProfile />} />
            <Route path='/shelter' element={<Shelter/>} />
            <Route path='/shelter/detail/:shelterId' element={<ShelterDetail /> }/>
            <Route path='/ab' element={<AB /> } />
            <Route path='/ab/detail/:abid' element={<ABDetail />} />
            <Route path="/board" element={<Board />} />
            <Route path="/board/write" element={<BoardWrite />} />
            <Route path="/boarddetail/:showNo" element={<BoardDetail />} />
            <Route path='/admin/contact' element={<AdminContact />} />
            <Route path='/admin/contact/detail/:adminNo' element={<AdminContactNormalTableDetail />} />
            <Route path='/admin/write' element={<AdminContactWrite />} />
            <Route path='/dog/random/date' element={<DogRandomDate />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
