import React, { useState } from 'react';
import KakaoMap from './components/KakaoMap';
import AddressSearch from './components/AddressSearch';
import ShelterList from './components/ShelterList';
import '../src/css/style.css'

function App() {
  const [address, setAddress] = useState('');

  return (
    <div className="container">
      <ShelterList/>
    </div>
  );
}

export default App;
