import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ABList from './ABList';
import styles from '../css/ShelterDetail.module.css';

const ShelterDetail = () => {
    const { shID } = useParams(); // 셸터 ID 가져오기
    const [shelter, setShelter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShelterDetail = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:9999/shelters/detail/${shID}`);
                console.log(response);
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
            <table className={styles.shelter_info_table}>
                <tbody>
                    <tr>
                        <td><strong>센터명:</strong></td>
                        <td>{shelter?.shName}</td>
                    </tr>
                    <tr>
                        <td><strong>연락처:</strong></td>
                        <td>{shelter?.shTel}</td>
                    </tr>
                    <tr>
                        <td><strong>해당지역:</strong></td>
                        <td>{shelter?.shRegion}</td>
                    </tr>
                    <tr>
                        <td><strong>주소:</strong></td>
                        <td>{shelter?.shAddress}</td>
                    </tr>
                    <tr>
                        <td><strong>운영시간:</strong></td>
                        <td>{shelter?.shHour}</td>
                    </tr>
                    <tr>
                        <td><strong>보호동물종:</strong></td>
                        <td>{shelter?.shAnimalType}</td>
                    </tr>
                </tbody>
            </table>
            <h2>보호 동물 목록</h2>
            <ABList shID={shID} />
        </div>
    );
}
export default ShelterDetail;