import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import styles from '../../css/poci_css/pl.module.css';
import PlSearchCity from '../pl_search_city_components/PlSearchCity';

const PAGE_SIZE = 5;

const PL = () => {
    const [plId, setPlId] = useState('');
    const [list, setList] = useState('');
    const [result, setResult] = useState([]);
    const [infoResult, setInfoResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pagination, setPagination] = useState(null);

    // 화면을 키면 처음으로 한 번 리스트를 가져오는 함수
    useEffect(() => {
        const cityData = async () => {
            try {
                const response = await axios.get('http://localhost:9999/city/list')
                setResult(response.data.contents);
                
            } catch (error) {
                console.log(error);
            }
        }
        cityData();
    }, [currentPage]);

    // 검색 시 API를 불러오는 함수 (PlSearchCity.js 파일)
    const handleListChange = (newList) => {
        setList(newList);
    };

    // 상세 정보 보기
    const PlInfoSelect = async (plId) => {
        try {
            const response = await axios.get(`http://localhost:9999/city/info?plId=${plId}`)
            setInfoResult(response.data.value);
        } catch (error) {
            console.log(error);
        }
    }

    // 페이지 넘버링
    const handlePageChange = (pageNo) => {
        
        const fetchPageData = async () => {
            try {
                const response = await axios.get(`http://localhost:9999/city/list?page=${pageNo}&size=${PAGE_SIZE}`);
                setResult(response.data.contents);
                setPagination(response.data.pagination);
            } catch (error) {
                console.error("There was an error fetching the page data!", error);
            }
        }
        fetchPageData();
    };
   
    return (
        <div className={styles.container}>
            <header>
                <Link to="/">놀이</Link>
            </header>
            <div className={styles.main_Image}>
                <h2 className={styles.sub_title}>놀이시설 찾기</h2>
                <img className={styles.logo_white} />
                <div className={styles.search_container}>
                    <PlSearchCity onListChange={handleListChange}/>
                </div>
            </div>
            <div className={styles.info_container}>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>번호</th>
                            <th>공원명</th>
                            <th>출입 허용 시간</th>
                            <th>전화번호</th>
                            <th>도로명 주소</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.map((city, index) => (
                            <tr key={index}>
                                <td>
                                    <button className={styles.DeleteBtn}>삭제</button>
                                </td>
                                <td>{city.plId}</td>
                                <td>{city.plName}</td>
                                <td>{city.plHour}</td>
                                <td>{city.plTel}</td>
                                <td>{city.plAddress}</td>
                                <td><Link to={`/plinfo/${city.plId}`}>이동</Link></td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="6" className={styles.pagination}>
                                {pagination && pagination.previousPageGroup && (
                                    <button onClick={() => handlePageChange(pagination.startPageOfPageGroup - 1)}>◀</button>
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
                                {pagination && pagination.nextPageGroup && (
                                    <button onClick={() => handlePageChange(pagination.endPageOfPageGroup + 1)}>▶</button>
                                )}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <footer className={styles.footer}>하단바</footer>
        </div>
    );
};

export default PL;
