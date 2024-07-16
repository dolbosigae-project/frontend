import React from 'react';
import KakaoMap from '../components/KakaoMap';

const Hospital = () => {
  return (
    <div>
      <h1>동물 의료</h1>
      <KakaoMap address="서울특별시 강남구 삼성동" />
    </div>
  );
};

export default Hospital;
