import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import ABList from './ABList'; // ABList 컴포넌트 import
// import styles from '../css/shelterDetail.module.css'; // CSS 모듈 import

const ShelterDetail = () => {
    const { shID } = useParams(); // 셸터 ID 가져오기
    const [shelter, setShelter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShelterDetail = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:9999/shelter/${shID}`);
                setShelter(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchShelterDetail();
    }, [shID]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className={styles.shelter_detail}>
            <h1>셸터 상세 정보</h1>
            <div className={styles.shelter_info}>
                <p><strong>센터명:</strong> {shelter?.shName}</p>
                <p><strong>주소:</strong> {shelter?.shAddress}</p>
                <p><strong>연락처:</strong> {shelter?.shPhone}</p>
                <p><strong>운영시간:</strong> {shelter?.shHours}</p>
                <p><strong>기타 정보:</strong> {shelter?.shInfo}</p>
            </div>
            <h2>보호 동물 목록</h2>
            <ABList shID={shID} />
        </div>
    );
};

export default ShelterDetail;
