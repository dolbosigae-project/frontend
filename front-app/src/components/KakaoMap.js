import React, { useEffect, useRef } from 'react';
import './style.css';
import AddressSearch from './AddressSearch';

const KakaoMap = ({ address }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const createMap = () => {
      const { kakao } = window;
      const container = mapRef.current;
      const options = {
        center: new kakao.maps.LatLng(37.407546, 127.115474),
        level: 3,
      };
      const map = new kakao.maps.Map(container, options);

      // Check if kakao.maps.services.Geocoder is available
      if (kakao.maps.services && kakao.maps.services.Geocoder) {
        const geocoder = new kakao.maps.services.Geocoder();
        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(37.407546, 127.115474),
          map: map,
        });

        if (address) {
          geocoder.addressSearch(address, function (results, status) {
            if (status === kakao.maps.services.Status.OK) {
              const result = results[0];
              const coords = new kakao.maps.LatLng(result.y, result.x);
              map.setCenter(coords);
              marker.setPosition(coords);
            }
          });
        }
      }
    };

    const loadScript = () => {
      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=692e35f9bcd7c043dcab11363ff9a06f&autoload=false`;
      script.onload = () => {
        window.kakao.maps.load(createMap);
      };
      document.head.appendChild(script);
    };

    if (!window.kakao) {
      loadScript();
    } else if (!window.kakao.maps) {
      window.kakao.maps.load(createMap);
    } else {
      createMap();
    }
  }, [address]);

    // handleAddressSearch 함수 정의
    const handleAddressSearch = (searchedAddress) => {
      // 주소 검색 로직 구현
      console.log('Searched Address:', searchedAddress);
      // 여기에 주소 검색 후 처리하는 로직 추가
    };

  return (
    <div className="kakao-map-container">
      <div ref={mapRef} className="map" id="map"></div>
      <AddressSearch onSearch={handleAddressSearch} />
    </div>
  );
};

export default KakaoMap;