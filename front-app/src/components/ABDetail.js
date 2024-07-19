import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ABDetail = () => {
    const { abID } = useParams();
    const [ab, setAb] = useState(null);
    const [shelter, setShelter] = useState(null);
    const [loading, setLoading] = useState(true);  // 초기 로딩 상태를 true로 설정
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchABDetail = async () => {
            try {
                const response = await axios.get(`https://localhost:9999/ab/${abID}`);
                setAb(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);  // 데이터 로드 완료 후 로딩 상태를 false로 설정
            }
        };

        const fetchShelterDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:9999/shelter/${ab.shID}`);
                setShelter(response.data);
            } catch (error) {
                setError(error);
            }
        };

        if (abID) {
            fetchABDetail();
        }
        if (ab && ab.shID) {
            fetchShelterDetail();
        }
    }, [abID, ab?.shID]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="ab-detail">
            <h1>AB Detail</h1>
            <div className="ab-image">
                {/* Assuming ab.abImage contains the URL to the image */}
                <img src={ab.abImage} alt={ab.abBreed} />
            </div>
            <div className="ab-info">
                <p>
                    센터명: 
                    <Link to={`/shelter/${ab.shID}`} className="shelter-link">
                        {shelter?.shName}
                    </Link>
                </p>
                <p>보호 시작일 : {new Date(ab.abDate).toLocaleDateString()}</p>
                <p>발견 장소 : {ab.abLocation}</p>
                <p>상태 : {ab.abStatus}</p>
                <p>보호종 : {ab.abBreed}</p>
                <p>성별 : {ab.abGender}</p>
                <p>나이 : {ab.abAge}</p>
                <p>무게 : {ab.abWeight}</p>
                <p>색상 : {ab.abColor}</p>
                <p>발견시 특이사항 : {ab.abRescued}</p>
                <p>특징 : {ab.abCharacter}</p>
            </div>
        </div>
    );
};

export default ABDetail;
