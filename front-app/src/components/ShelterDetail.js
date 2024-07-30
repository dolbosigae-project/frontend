import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import styles from '../css/ShelterDetail.module.css';

const ShelterDetail = () => {
    const { shID } = useParams(); // URL 파라미터에서 ID 추출
    console.log("shID:", shID);
    const [shelter, setShelter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShelterDetail = async () => {
            setLoading(true);
            try {
                // URL 경로에 ID를 포함시켜 요청
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
            <div className={styles.buttonContainer}>
                <Link to="/animal-medical" className={styles.linkButton}>글 목록</Link>
            </div>
        </div>
    );
};

export default ShelterDetail;
