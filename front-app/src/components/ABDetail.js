// ABDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import styles from '../css/ABDetail.module.css';  // 스타일 파일

const ABDetail = () => {
    const { abID } = useParams();
    const [ab, setAb] = useState(null);
    const [shelter, setShelter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchABDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:9999/ab/detail/${abID}`);
                console.log("AB Detail Response:", response.data); // 추가
                setAb(response.data);
    
                if (response.data.shID) {
                    const shelterResponse = await axios.get(`http://localhost:9999/shelters/detail/${response.data.shID}`);
                    console.log("Shelter Response:", shelterResponse.data); // 추가
                    setShelter(shelterResponse.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error); // 추가
                setError(error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchABDetail();
    }, [abID]);
    

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className={styles.main_container}>
            <h1 className={styles.title}>AB Detail</h1>
            <div className={styles.image_container}>
                <img src={ab.abImage} alt={ab.abBreed} className={styles.ab_image} />
            </div>
            <table className={styles.info_table}>
                <tbody>
                    <tr className={styles.table_row}>
                        <td className={styles.table_label}>센터명</td>
                        <td className={styles.table_data}>
                            <Link to={`/shelters/detail/${ab.shID}`} className={styles.shelter_link}>
                                {shelter?.shName || '센터 정보 없음'}
                            </Link>
                        </td>
                    </tr>
                    <tr className={styles.table_row}>
                        <td className={styles.table_label}>보호 시작일</td>
                        <td className={styles.table_data}>{new Date(ab.abDate).toLocaleDateString()}</td>
                    </tr>
                    <tr className={styles.table_row}>
                        <td className={styles.table_label}>발견 장소</td>
                        <td className={styles.table_data}>{ab.abLocation}</td>
                    </tr>
                    <tr className={styles.table_row}>
                        <td className={styles.table_label}>상태</td>
                        <td className={styles.table_data}>{ab.abStatus}</td>
                    </tr>
                    <tr className={styles.table_row}>
                        <td className={styles.table_label}>보호종</td>
                        <td className={styles.table_data}>{ab.abBreed}</td>
                    </tr>
                    <tr className={styles.table_row}>
                        <td className={styles.table_label}>성별</td>
                        <td className={styles.table_data}>{ab.abGender}</td>
                    </tr>
                    <tr className={styles.table_row}>
                        <td className={styles.table_label}>나이</td>
                        <td className={styles.table_data}>{ab.abAge}</td>
                    </tr>
                    <tr className={styles.table_row}>
                        <td className={styles.table_label}>무게</td>
                        <td className={styles.table_data}>{ab.abWeight}</td>
                    </tr>
                    <tr className={styles.table_row}>
                        <td className={styles.table_label}>색상</td>
                        <td className={styles.table_data}>{ab.abColor}</td>
                    </tr>
                    <tr className={styles.table_row}>
                        <td className={styles.table_label}>발견시 특이사항</td>
                        <td className={styles.table_data}>{ab.abRescued}</td>
                    </tr>
                    <tr className={styles.table_row}>
                        <td className={styles.table_label}>특징</td>
                        <td className={styles.table_data}>{ab.abCharacter}</td>
                    </tr>
                </tbody>
            </table>
            <footer className={styles.footer}></footer>
        </div>
    );
};

export default ABDetail;