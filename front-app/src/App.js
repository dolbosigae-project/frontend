import React, { useState } from 'react';
import KakaoMap from './components/KakaoMap';
import AddressSearch from './components/AddressSearch';
import './App.css';

function App() {
  const [address, setAddress] = useState('');

  return (
    <div className="container">
      <KakaoMap address={address} />
      <AddressSearch setAddress={setAddress} />
    </div>
  );
}

export default App;
