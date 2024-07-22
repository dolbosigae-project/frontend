import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../css/hospital.module.css';
import HospitalNumberRing from './HospitalNumberRing'; // Correct import
import KakaoMap from './KakaoMap';

const HO = () => {
    const [hoText, setHoText] = useState('');
    const [error, setError] = useState('');
    const [result, setResult] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [pagination, setPagination] = useState({ totalPages: 0, currentPage: 1 });

    const fetchHospitalData = async () => {
        try {
            const response = await axios.get('http://localhost:9999/hospitals/list', {
                params: { hoText, page, limit }
            });
            const contents = response.data.contents || [];
            setResult(contents);
            setPagination({
                totalPages: response.data.pagination.totalPages,
                currentPage: page,
            });
        } catch (error) {
            console.log('Error fetching data:', error);
            setError('Error fetching data');
        }
    };

    useEffect(() => {
        fetchHospitalData();
    }, [page, limit]);

    const searchHospitalClick = async () => {
        setPage(1);
        fetchHospitalData();
    };

    const onNumberRing = (number) => {
        setPage(Number(number));  // ensure the number is parsed as a number
    };

    const renderTable = useCallback(() => (
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>번호</th>
                    <th>병원명</th>
                    <th>지역</th>
                    <th>전화번호</th>
                    <th>도로명 주소</th>
                    <th>상세정보</th>
                </tr>
            </thead>
            <tbody>
                {result.map((hospital, index) => (
                    <tr key={index}>
                        <td>
                            <button className={styles.DeleteBtn}>삭제</button>
                        </td>
                        <td>{hospital.hoId}</td>
                        <td>{hospital.hoName}</td>
                        <td>{hospital.hoRegion}</td>
                        <td>{hospital.hoTel}</td>
                        <td>{hospital.hoAddress}</td>
                        <td>{hospital.hoInfo}</td>
                        <td>
                            <Link
                                to={`/hoinfo/${hospital.hoId}`}
                                className={styles.linkButton} // Apply button styles
                            >
                                이동
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    ), [result]);

    // 병원 위치 데이터를 KakaoMap에 전달할 형태로 변환합니다.
    const locations = result.map(hospital => ({
        name: hospital.hoName,
        lat: parseFloat(hospital.hoLat), // 위도
        lng: parseFloat(hospital.hoLng)  // 경도
    }));

    return (
        <div className={styles.container}>
            <div className={styles.main_Image}>
                <div className={styles.search_container}>
                    <input
                        type="text"
                        value={hoText}
                        placeholder="병원명 입력"
                        onChange={(e) => setHoText(e.target.value)}
                    />
                    <button onClick={searchHospitalClick}>조회</button>
                    {error && <div className={styles.error}>{error}</div>}
                </div>
                {result.length > 0 && renderTable()}
            </div>
            <div className={styles.info_container}>
                <HospitalNumberRing onNumberRing={onNumberRing} pagination={pagination} />
                <KakaoMap locations={locations} /> {/* KakaoMap 컴포넌트 추가 */}
            </div>
            <footer className={styles.footer}>박유영0722</footer>
        </div>
    );
};

export default HO;
