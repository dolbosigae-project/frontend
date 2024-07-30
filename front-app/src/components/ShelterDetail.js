import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'; // Link 컴포넌트 추가
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
                // 경로 파라미터를 사용한 URL 요청
                const response = await axios.get(`http://localhost:9999/shelterdetail/${shID}`);
                console.log("Shelter Response:", response.data);
                setShelter(response.data);
            } catch (error) {
                console.error("Error fetching shelter detail:", error);
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
        return <div>Error: {error.message || 'An unknown error occurred'}</div>;
    }

    return (
        <div className={styles.main_container}>
            <h1>셸터 상세 정보</h1>
            <table className={styles.shelter_info_table}>
                <tbody>
                    <tr>
                        <td className={styles.label}><strong>센터명:</strong></td>
                        <td className={styles.data}>{shelter?.shName || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td className={styles.label}><strong>연락처:</strong></td>
                        <td className={styles.data}>{shelter?.shTel || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td className={styles.label}><strong>해당지역:</strong></td>
                        <td className={styles.data}>{shelter?.shRegion || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td className={styles.label}><strong>주소:</strong></td>
                        <td className={styles.data}>{shelter?.shAddress || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td className={styles.label}><strong>운영시간:</strong></td>
                        <td className={styles.data}>{shelter?.shHour || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td className={styles.label}><strong>보호동물종:</strong></td>
                        <td className={styles.data}>{shelter?.shAnimalType || 'N/A'}</td>
                    </tr>
                </tbody>
            </table>
            <h2>보호 동물 목록</h2>
            <ABList shID={shID} />
            {/* 글 목록으로 이동하는 버튼 추가 */}
            <div className={styles.buttonContainer}>
                <Link to="/animal-medical" className={styles.linkButton}>글 목록</Link>
            </div>
        </div>
    );
};

export default ShelterDetail;
