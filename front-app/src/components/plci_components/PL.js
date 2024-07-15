import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlSelectDong from './PlSelectDong';
import styles from '../../css/poci_css/pl.module.css';
import { Link } from 'react-router-dom';

const ITEMS_PER_PAGE = 5;

const PL = () => {
    const [plName, setPlName] = useState('');
    const [plHour, setPlHour] = useState('');
    const [plTel, setPlTel] = useState('');
    const [plAddress, setPlAddress] = useState('');
    const [selectPlCity, setSelectPlCity] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchData();
    }, [plName, plHour, plTel, plAddress, currentPage]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:9999/select/city', {
                params: {
                    plName: plName,
                    plHour: plHour,
                    plTel: plTel,
                    plAddress: plAddress,
                    currentPage: currentPage,
                    limit: ITEMS_PER_PAGE
                }
            });
            if (response.status === 200) {
                const { contents, pagination } = response.data; // 백엔드에서 반환하는 ResponseVo 구조에 맞게 수정
                setSearchResult(contents);
                setTotalPages(pagination.totalPages);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className={styles.container}>
            <header>
                <Link to="/">놀이</Link>
            </header>
            <div className={styles.main_Image}>
                <img className={styles.main_img} />
            <div className={styles.search_container}>
                    <PlSelectDong selectPlCity={selectPlCity} setSelectPlCity={setSelectPlCity} />
                    <button className={styles.search_btn} onClick={fetchData}>
                        조회
                    </button>
            </div>
            </div>
            <div className={styles.info_container}>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>공원명</th>
                            <th>출입 허용 시간</th>
                            <th>전화번호</th>
                            <th>도로명 주소</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResult.map((item, idx) => (
                            <tr key={idx}>
                                <td><button className={styles.DeleteBtn}>삭제</button></td>
                                <td>{item.plName}</td>
                                <td>{item.plHour}</td>
                                <td>{item.plTel}</td>
                                <td>{item.plAddress}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    ◀ 이전
                </button>
                <span>{currentPage} / {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    다음 ▶
                </button>
            </div>
            <footer className={styles.footer}>하단바</footer>
        </div>
    );
};

export default PL;
