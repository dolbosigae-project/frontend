// src/components/HO.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // React Router의 Link 추가
import KakaoMap from './KakaoMap';
import styles from '../css/hospital.module.css';

const PAGE_GROUP_SIZE = 5;

const Select1 = () => (
    <select className={styles.select_su_dong}>
        <option>선택</option>
        <option>수진동</option>
        <option>삼평동</option>
        <option>정자동</option>
        <option>수내동</option>
        <option>단대동</option>
        <option>구미동</option>
        <option>율동</option>
    </select>
);

const Select2 = () => (
    <select className={styles.select_su_dong}>
        <option>선택</option>
        <option>하동</option>
        <option>권선동</option>
        <option>금곡동</option>
    </select>
);

const Select3 = () => (
    <select className={styles.select_su_dong}>
        <option>선택</option>
        <option>석수동</option>
    </select>
);

const Select4 = () => (
    <select className={styles.select_su_dong}>
        <option>선택</option>
        <option>성곡동</option>
    </select>
);

const Select5 = () => (
    <select className={styles.select_su_dong}>
        <option>선택</option>
        <option>동삭동</option>
        <option>팽성읍</option>
        <option>청북읍</option>
        <option>오성면</option>
        <option>포승읍</option>
        <option>이충동</option>
    </select>
);

const Select6 = () => (
    <select className={styles.select_su_dong}>
        <option>선택</option>
        <option>상하동</option>
        <option>하갈동</option>
        <option>상현동</option>
    </select>
);

const Select7 = () => (
    <select className={styles.select_su_dong}>
        <option>선택</option>
        <option>장호원읍</option>
        <option>부발읍</option>
    </select>
);

const Select8 = () => (
    <select className={styles.select_su_dong}>
        <option>선택</option>
        <option>하성면</option>
    </select>
);

const Select9 = () => (
    <select className={styles.select_su_dong}>
        <option>선택</option>
        <option>오산동</option>
        <option>정남면</option>
    </select>
);

const Select10 = () => (
    <select className={styles.select_su_dong}>
        <option>선택</option>
        <option>옥정동</option>
    </select>
);

const Select11 = () => (
    <select className={styles.select_su_dong}>
        <option>선택</option>
        <option>교문동</option>
    </select>
);

const Select12 = () => (
    <select className={styles.select_su_dong}>
        <option>선택</option>
        <option>일산동구</option>
        <option>일산서구</option>
        <option>동산동</option>
    </select>
);

const HO = () => {
    const [hoId, setHoId] = useState('');
    const [hoName, setHoName] = useState('');
    const [hoPost, setHoPost] = useState('');
    const [hoTel, setHoTel] = useState('');
    const [hoAddress, setHoAddress] = useState('');
    const [hoCity, setHoCity] = useState('');
    const [selectHoCity, setSelectHoCity] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pagination, setPagination] = useState();

    useEffect(() => {
        fetchData();
    }, [hoId, hoName, hoPost, hoTel, hoAddress, currentPage]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:9999/city/list', {
                params: {
                    hoId: hoId,
                    hoName: hoName,
                    hoPost: hoPost,
                    hoTel: hoTel,
                    hoAddress: hoAddress,
                    page: currentPage,
                    limit: 5
                }
            });
            if (response.status === 200) {
                const { contents, pagination } = response.data;
                setSearchResult(contents);
                setTotalPages(pagination.totalPages);
                setPagination(pagination);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handlePageChange = (pageNo) => {
        setCurrentPage(pageNo);
    };

    const pageGroupStart = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
    const pageGroupEnd = Math.min(pageGroupStart + PAGE_GROUP_SIZE - 1, totalPages);
    const previousPageGroup = pageGroupStart > 1;
    const nextPageGroup = pageGroupEnd < totalPages;

    const SelectOption = (e) => {
        setSelectHoCity(e.target.value);
    };

    const SearchCity = () => {
        switch (selectHoCity) {
            case '1':
                return <Select1 />;
            case '2':
                return <Select2 />;
            case '3':
                return <Select3 />;
            case '4':
                return <Select4 />;
            case '5':
                return <Select5 />;
            case '6':
                return <Select6 />;
            case '7':
                return <Select7 />;
            case '8':
                return <Select8 />;
            case '9':
                return <Select9 />;
            case '10':
                return <Select10 />;
            case '11':
                return <Select11 />;
            case '12':
                return <Select12 />;
            default:
                return null;
        }
    };

    // 조회 버튼 클릭 시 HospitalDetail 페이지로 이동하는 함수
    const goToHospitalDetail = () => {
        // 예시로 '/hospitalDetail' 경로를 사용하였습니다. 실제 경로에 맞게 수정해주세요.
        // 또한, React Router의 Link 컴포넌트를 사용하여 페이지 이동을 처리합니다.
        return (
            <Link to="/hospitalDetail">
                <button className={styles.searchBtn} onClick={searchClick}>
                    조회
                </button>
            </Link>
        );
    };

    const searchClick = async () => {
        try {
            const response = await axios.get('http://localhost:9999/search/city', {
                params: {
                    hoCity: hoCity // 선택된 도시 정보 전송
                }
            });
            if (response.status === 200) {
                const { contents, pagination } = response.data;
                setSearchResult(contents);
                setTotalPages(pagination.totalPages);
                setPagination(pagination);
            }
        } catch (error) {
            console.error('Error searching:', error);
        }
    };

    return (
        <div>
            <div className={styles.banner}></div> {/* 배너 섹션 추가 */}
        <div className={styles.container}>
           
            <div className={styles.mapContainer}>
                <KakaoMap />
            </div>
            <div className={styles.searchContainer}>
                <div className={styles.Search_mainContainer}>
                    <select className={styles.select_gu} onChange={SelectOption}>
                        <option value="1">성남시 분당구</option>
                        <option value="2">수원시 권선구</option>
                        <option value="3">안양시 만안구</option>
                        <option value="4">부천시 오정구</option>
                        <option value="5">평택시</option>
                        <option value="6">용인시 기흥구</option>
                        <option value="7">이천시</option>
                        <option value="8">김포시</option>
                        <option value="9">화성시</option>
                        <option value="10">의정부시</option>
                        <option value="11">구리시</option>
                        <option value="12">고양시</option>
                    </select>
                    <SearchCity />
                    {goToHospitalDetail()}
                </div>
                <div className={styles.hospitalList}>
                    {searchResult.map((item) => (
                        <div key={item.hoId} className={styles.hospitalItem}>
                            <h3>{item.hoName}</h3>
                            <p>우편번호: {item.hoPost}</p>
                            <p>전화번호: {item.hoTel}</p>
                            <p>주소: {item.hoAddress}</p>
                        </div>
                    ))}
                </div>
                <div className={styles.pagination}>
                    {previousPageGroup && (
                        <button onClick={() => handlePageChange(pageGroupStart - 1)}>
                            이전
                        </button>
                    )}
                    {Array.from({ length: pageGroupEnd - pageGroupStart + 1 }, (_, idx) => (
                        <button
                            key={idx}
                            onClick={() => handlePageChange(pageGroupStart + idx)}
                            disabled={currentPage === pageGroupStart + idx}
                        >
                            {pageGroupStart + idx}
                        </button>
                    ))}
                    {nextPageGroup && (
                        <button onClick={() => handlePageChange(pageGroupEnd + 1)}>
                            다음
                        </button>
                    )}
                </div>
            </div>
        </div>
        </div>
    );
};

export default HO;
