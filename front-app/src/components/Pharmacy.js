import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../css/pharmacy.module.css'; // CSS 파일명도 변경했는지 확인
import PharmacyNumberRing from './PharmacyNumberRing'; // Correct import
import KakaoMap from './KakaoMap';

const PH = () => {
    const [phText, setPhText] = useState('');
    const [error, setError] = useState('');
    const [result, setResult] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [pagination, setPagination] = useState({ totalPages: 0, currentPage: 1 });

    const fetchPharmacyData = async () => {
        try {
            const response = await axios.get('http://localhost:9999/pharmacies/list', {
                params: { phText, page, limit }
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
        fetchPharmacyData();
    }, [page, limit]);

    const searchPharmacyClick = async () => {
        setPage(1);
        fetchPharmacyData();
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
                    <th>약국명</th> {/* 병원명을 약국명으로 변경 */}
                    <th>지역</th>
                    <th>전화번호</th>
                    <th>주소</th>
                    <th>운영시간</th>
                </tr>
            </thead>
            <tbody>
                {result.map((pharmacy, index) => ( // 병원 대신 약국으로 변경
                    <tr key={index}>
                        <td>
                            <button className={styles.DeleteBtn}>삭제</button>
                        </td>
                        <td>{pharmacy.phId}</td> {/* hoId 대신 phId로 변경 */}
                        <td>{pharmacy.phName}</td> {/* hoName 대신 phName으로 변경 */}
                        <td>{pharmacy.phRegion}</td> {/* hoRegion 대신 phRegion으로 변경 */}
                        <td>{pharmacy.phTel}</td> {/* hoTel 대신 phTel로 변경 */}
                        <td>{pharmacy.phAddress}</td> {/* hoAddress 대신 phAddress로 변경 */}
                        <td>{pharmacy.phHour}</td> {/* 추가된 phHour 필드 사용 */}
                        <td>
                            <Link
                                to={`/phinfo/${pharmacy.phId}`} // 병원 ID 대신 약국 ID 사용
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

    // 약국 위치 데이터를 KakaoMap에 전달할 형태로 변환합니다.
    const locations = result.map(pharmacy => ({
        name: pharmacy.phName, // 약국명 사용
        lat: parseFloat(pharmacy.phLat), // 위도
        lng: parseFloat(pharmacy.phLng)  // 경도
    }));

    return (
        <div className={styles.container}>
            <div className={styles.main_Image}>
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        value={phText} // hoText 대신 phText 사용
                        placeholder="주소를 입력해주세요. (예: 기흥, 성남)"
                        onChange={(e) => setPhText(e.target.value)} // hoText 대신 phText 사용
                        className={styles.searchInput} // Apply the new style here
                    />
                    <button onClick={searchPharmacyClick}>조회</button> {/* searchHospitalClick 대신 searchPharmacyClick 사용 */}
                    {error && <div className={styles.error}>{error}</div>}
                </div>
                {result.length > 0 && renderTable()}
            </div>
            <div className={styles.info_container}>
                <PharmacyNumberRing onNumberRing={onNumberRing} pagination={pagination} /> {/* HospitalNumberRing 대신 PharmacyNumberRing 사용 */}
                <KakaoMap locations={locations} /> {/* KakaoMap 컴포넌트 추가 */}
            </div>
            <footer className={styles.footer}>박유영0723</footer>
        </div>
    );
};

export default PH;
