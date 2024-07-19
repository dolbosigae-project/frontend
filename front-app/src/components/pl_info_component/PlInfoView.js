import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../../css/PlInfoView.module.css';

const PlInfoView = () => {
    const { plId } = useParams();
    const [placeInfo, setPlaceInfo] = useState(null);

    useEffect(() => {
        const fetchPlaceInfo = async () => {
            try {
                const response = await fetch(`http://localhost:9999/city/info?plId=${plId}`);
                const data = await response.json();
                setPlaceInfo(data); // 받은 데이터를 상태에 저장
            } catch (error) {
                console.error('Error fetching place info:', error);
            }
        };

        fetchPlaceInfo();
    }, [plId]);

    if (!placeInfo) {
        return <div>Loading...</div>; // 데이터를 기다리는 동안 로딩 표시
    }

    return (
        <div>
            <h1>{placeInfo.plId}</h1>
            <h2>{placeInfo.plName}</h2>
            <p><strong>도시:</strong> {placeInfo.plCity}</p>
            <p><strong>주소:</strong> {placeInfo.plAddress}</p>
            <p><strong>면적:</strong> {placeInfo.plArea}</p>
            <p><strong>운영 요일:</strong> {placeInfo.plDay}</p>
            <p><strong>운영 시간:</strong> {placeInfo.plHour}</p>
            <p><strong>연락처:</strong> {placeInfo.plTel}</p>
            <p><strong>입장료:</strong> {placeInfo.plExpense}</p>
            <img src={placeInfo.plImg} />

        </div>
    );
};

export default PlInfoView;
