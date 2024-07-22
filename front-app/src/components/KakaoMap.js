// src/components/KakaoMap.js
import React, { useEffect, useRef } from 'react';

const KakaoMap = ({ locations }) => {
    const mapContainer = useRef(null);

    useEffect(() => {
        // 카카오 지도 API를 초기화합니다.
        const { kakao } = window;

        if (mapContainer.current && kakao) {
            // 지도를 생성합니다.
            const map = new kakao.maps.Map(mapContainer.current, {
                center: new kakao.maps.LatLng(37.407546, 127.115474), 
                level: 3
            });

            // 마커를 추가합니다.
            locations.forEach(location => {
                const marker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(location.lat, location.lng),
                    map: map,
                    title: location.name
                });
            });
        }
    }, [locations]);

    return <div ref={mapContainer} style={{ width: '100%', height: '400px' }}></div>;
};

export default KakaoMap;
