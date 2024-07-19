import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import KakaoMap from './KakaoMap';  // KakaoMap 컴포넌트를 import 합니다.

const ShelterDetail = () => {
    const { shID } = useParams();
    const [shelter, setShelter] = useState(null);
    const [abList, setAbList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShelter = async () => {
            try {
                const response = await axios.get(`http://localhost:9999//shelter/${shID}`);
                setShelter(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        const fetchABList = async () => {
            try {
                const response = await axios.get(`https://localhost:9999/ab`, {
                    params: { shID }
                });
                setAbList(response.data.list);
            } catch (error) {
                setError(error);
            }
        };

        fetchShelter();
        fetchABList();
    }, [shID]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <div>
                <KakaoMap address={shelter.shAddress} />  {/* KakaoMap 컴포넌트를 사용하여 지도를 표시합니다. */}
            </div>
            <div>
                <p>센터명 : {shelter.shName}</p>
                <p>센터번호 : {shelter.shTel}</p>
                <p>센터지역 : {shelter.shRegion}</p>
                <p>구조대상동물: {shelter.shAnimalType}</p>
                <p>센터주소 : {shelter.shAddress}</p>
                <p>센터운영시간 : {shelter.shHour}</p>
            </div>
            <div>
                <h2>보호 중인 동물 목록</h2>
                {abList.length > 0 ? (
                    abList.map((ab) => (
                        <Link to={`/ab/${ab.abID}`} key={ab.abID} className="ab-card">
                            <div className="ab-image">
                                {/* Image will be added here */}
                            </div>
                            <div className="ab-info">
                                <p>보호종 : {ab.abBreed}</p>
                                <p>발견 장소 : {ab.abLocation}</p>
                                <p>특징 : {ab.abCharacter}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>보호 중인 동물이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default ShelterDetail;