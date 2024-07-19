import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../css/hospitalDetail.module.css';

const PAGE_GROUP_SIZE = 5;

const HospitalDetail = () => {
    const [searchResult, setSearchResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pagination, setPagination] = useState();

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:9999/hospitals', {
                params: {
                    page: currentPage,
                    limit: 10 // 페이지당 항목 수, Spring에서 설정한 대로
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

    return (
        <div className={styles.container}>
            <h2 className={styles.subTitle}>병원 정보 목록</h2>
            <div className={styles.infoContainer}>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>번호</th>
                            <th>지역</th>
                            <th>병원명</th>
                            <th>전화번호</th>
                            <th>도로명 주소</th>
                            <th>우편번호</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResult.map((item, idx) => (
                            <tr key={idx}>
                                <td>
                                    <button className={styles.deleteBtn}>삭제</button>
                                </td>
                                <td><Link to={`/${item.hoId}`} className={styles.hoName}>{item.hoId}</Link></td>
                                <td>{item.hoRegion}</td>
                                <td>{item.hoName}</td>
                                <td>{item.hoTel}</td>
                                <td>{item.hoAddress}</td>
                                <td>{item.hoPost}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className={styles.pagination}>
                {previousPageGroup && (
                    <button onClick={() => handlePageChange(pagination.pageOfPageGroup - 1)}>◀</button>
                )}
                {pagination && Array.from({ length: pagination.endPageOfPageGroup - pagination.startPageOfPageGroup + 1 }, (_, i) => (
                    <button
                        key={i + pagination.startPageOfPageGroup}
                        onClick={() => handlePageChange(i + pagination.startPageOfPageGroup)}
                        className={pagination.currentPage === i + pagination.startPageOfPageGroup ? styles.activePage : ''}
                    >
                        {i + pagination.startPageOfPageGroup}
                    </button>
                ))}
                {nextPageGroup && (
                    <button onClick={() => handlePageChange(pagination.endPageOfPageGroup + 1)}>▶</button>
                )}
            </div>

            <footer className={styles.footer}>박유영</footer>
        </div>
    );
};

export default HospitalDetail;
