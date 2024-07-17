import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
            const response = await axios.get('http://localhost:9999/hospital/list', {
                params: {
                    page: currentPage,
                    limit: 10 // 예시로 임의의 값 사용
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
            <h2 className={styles.subTitle}></h2> {/* 이 부분을 container 밖으로 빼냈습니다. */}
            <div className={styles.infoContainer}>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>번호</th>
                            <th>병원명</th>
                            <th>영업시간</th>
                            <th>전화번호</th>
                            <th>도로명 주소</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResult.map((item, idx) => (
                            <tr key={idx}>
                                <td>
                                    <button className={styles.deleteBtn}>삭제</button>
                                </td>
                                <td><Link to={`/${item.hoId}`} className={styles.hoName}>{item.hoId}</Link></td>
                                <td><Link to={`/${item.hoId}`} className={styles.hoName}>{item.hoName}</Link></td>
                                <td><Link to={`/${item.hoId}`} className={styles.hoName}>{item.hoHour}</Link></td>
                                <td><Link to={`/${item.hoId}`} className={styles.hoName}>{item.hoTel}</Link></td>
                                <td><Link to={`/${item.hoId}`} className={styles.hoName}>{item.hoAddress}</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            
            <div className={styles.pagination}>
                {previousPageGroup && (
                    <button onClick={() => handlePageChange(pagination.PageOfPageGroup - 1)}>◀</button>
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
