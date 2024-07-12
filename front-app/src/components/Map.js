import React, { useEffect, useRef } from 'react';

const KakaoMap = ({ address }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const createMap = () => {
      const { kakao } = window;
      const container = mapRef.current;
      const options = {
        center: new kakao.maps.LatLng(37.407546, 127.115474),
        level: 3
      };
      const map = new kakao.maps.Map(container, options);
      const geocoder = new kakao.maps.services.Geocoder();
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(37.407546, 127.115474),
        map: map
      });

      if (address) {
        geocoder.addressSearch(address, function(results, status) {
          if (status === kakao.maps.services.Status.OK) {
            const result = results[0];
            const coords = new kakao.maps.LatLng(result.y, result.x);
            map.setCenter(coords);
            marker.setPosition(coords);
          }
        });
      }
    };

    if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
      createMap();
    } else {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=발급받은 API KEY를 사용하세요&libraries=services`;
      script.onload = createMap;
      document.head.appendChild(script);
    }
  }, [address]);

  return <div ref={mapRef} style={{ width: '800px', height: '800px', border: '1px solid black', margin: '0 auto', marginLeft: '100px' }}></div>;
};

export default KakaoMap;
