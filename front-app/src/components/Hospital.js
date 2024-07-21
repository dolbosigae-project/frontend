import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import KakaoMap from './KakaoMap';
import styles from '../css/hospital.module.css';
import SubTitleHospital from '../components/SubTitles/SubTitleHospital'

const PAGE_GROUP_SIZE = 5;

// Select 컴포넌트들은 생략

const HO = () => {
    const [searchResult, setSearchResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:9999/hospitals', {
                params: {
                    page: currentPage,
                    limit: 5
                }
            });
            if (response.status === 200) {
                const { contents, pagination } = response.data;
                setSearchResult(contents);
                setTotalPages(pagination.totalPages);
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

    return (
        <div>
            <SubTitleHospital />
            <div className={styles.container}>
                <div className={styles.mapContainer}>
                    <KakaoMap />
                </div>
                <div className={styles.searchContainer}>
                    <div className={styles.Search_mainContainer}>
                        <select className={styles.select_gu} onChange={e => setCurrentPage(1)}>
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
                       
                        <Link to="/hospitalDetail">
                            <button className={styles.searchBtn} onClick={fetchData}>
                                조회
                            </button>
                        </Link>
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
