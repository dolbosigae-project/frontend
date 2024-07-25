import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './plInfoView.css/plInfoView.module.css';

const PlInfoView = () => {
    const { plId } = useParams();
    const [placeInfo, setPlaceInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlaceInfo = async () => {
            try {
                const response = await fetch(`http://localhost:9999/city/info?plId=${plId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPlaceInfo(data); // 받은 데이터를 상태에 저장
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
                console.error('Error fetching place info:', error);
            }
        };

        fetchPlaceInfo();
    }, [plId]);

    if (loading) {
        return <div>Loading...</div>; // 데이터를 기다리는 동안 로딩 표시
    }

    if (error) {
        return <div>Error: {error.message}</div>; // 에러가 발생했을 때 에러 메시지 표시
    }

    return (
        <div className={styles.main_container}>
            <img src={placeInfo.plImg} className={styles.info_Img} alt="Park" />
            <table>
                <tbody>
                    <tr className={styles.tr}>
                        <td className={styles.name_td}><p className={styles.p_Tag}>공원명</p></td>
                        <td className={styles.data_Td}>{placeInfo.plName}</td>
                        <td className={styles.name_td}><p className={styles.p_Tag}>연락처</p></td>
                        <td className={styles.data_Td}>{placeInfo.plTel}</td>
                    </tr>
                    <tr className={styles.tr}>
                        <td className={styles.name_td}><p className={styles.p_Tag}>위치</p></td>
                        <td className={styles.data_Td}>{placeInfo.plCity}</td>
                        <td className={styles.name_td}><p className={styles.p_Tag}>입장료</p></td>
                        <td className={styles.data_Td}>{placeInfo.plExpense}</td>
                    </tr>
                    <tr className={styles.Address_Tr}>
                        <td className={styles.name_td}><p className={styles.p_Tag}>주소</p></td>
                        <td className={styles.data_Td} colSpan="4">{placeInfo.plAddress}</td>
                    </tr>
                    <tr className={styles.tr}>
                        <td className={styles.name_td}><p className={styles.p_Tag}>운영 요일</p></td>
                        <td className={styles.data_Td}>{placeInfo.plDay}</td>
                        <td className={styles.name_td}><p className={styles.p_Tag}>운영 시간</p></td>
                        <td className={styles.data_Td}>{placeInfo.plHour}</td>
                    </tr>
                    <tr className={styles.tr}>
                        <td className={styles.name_td}><p className={styles.p_Tag}>면적</p></td>
                        <td className={styles.data_Td}>{placeInfo.plArea}</td>
                    </tr>
                </tbody>
            </table>
            <footer className={styles.footer}>하단바</footer>
        </div>
    );
};

export default PlInfoView;