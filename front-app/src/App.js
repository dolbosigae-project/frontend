import React, { useState } from 'react';
import KakaoMap from './components/KakaoMap';
import AddressSearch from './components/AddressSearch';
import ShelterList from './components/ShelterList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../src/css/style.css'
import ABList from './components/ABList';

function App() {
  const [address, setAddress] = useState('');

  return (
    
    <Router>
            <Routes>
                <Route path="/ab-list" element={<ABList />} />
                {/* 기타 라우트 설정 */}
            </Routes>
        </Router>
    
  );
}

export default App;
