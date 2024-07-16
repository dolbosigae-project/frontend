import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlSelectDong from './PlSelectDong';
import styles from '../../css/poci_css/pl.module.css';
import { Link } from 'react-router-dom';

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
const PL = () => {
    const [plId, setPlId] = useState('');
    const [plName, setPlName] = useState('');
    const [plHour, setPlHour] = useState('');
    const [plTel, setPlTel] = useState('');
    const [plAddress, setPlAddress] = useState('');
    const [plCity, setPlCity] = useState('');
    const [selectPlCity, setSelectPlCity] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pagination, setPagination] = useState();

    useEffect(() => {
        fetchData();
    }, [plId, plName, plHour, plTel, plAddress, currentPage]);

    const fetchData = async() => {
        try {
            const response = await axios.get('http://localhost:9999/city/list', {
                params: {
                    plId: plId,
                    plName: plName,
                    plHour: plHour,
                    plTel: plTel,
                    plAddress: plAddress,
                    page: currentPage,
                    limit : 5 // 한페이지에 뜨는 데이터 정보 개수
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
const SelectOption = (e) => {
    setSelectPlCity(e.target.value);
};

const SearchCity = () => {
    switch (selectPlCity) {
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

////////////////////////////////////////////////////////////////////////////////////////////////////
    const searchClick = async() => {
        try {
            const response = await axios.get('http://localhost:9999/search/city', {
                params: {
                    plCity : plCity// 선택된 도시 정보 전송
                }
            });
            if (response.status === 200) {
                const { contents, pagination } = response.data;
                setSearchResult(contents); // 검색 결과 업데이트
                setTotalPages(pagination.totalPages); // 전체 페이지 수 업데이트
                setPagination(pagination); // 페이징 정보 업데이트
            }
        } catch (error) {
            console.error('Error searching:', error);
        }
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
                        <select className={styles.select_gu} onChange={SelectOption}>
                            <option>선택</option>
                            <option className={styles.option} value="1">성남시</option>
                            <option className={styles.option} value="2">수원시</option>
                            <option className={styles.option} value="3">안양시</option>
                            <option className={styles.option} value="4">안산시</option>
                            <option className={styles.option} value="5">평택시</option>
                            <option className={styles.option} value="6">용인시</option>
                            <option className={styles.option} value="7">이천시</option>
                            <option className={styles.option} value="8">김포시</option>
                            <option className={styles.option} value="9">화성시</option>
                            <option className={styles.option} value="10">양주시</option>
                            <option className={styles.option} value="11">구리시</option>
                            <option className={styles.option} value="12">고양시</option>
                        </select>
                            {SearchCity()}
                    <button className={styles.search_btn} onClick={searchClick}>
                        조회
                    </button>
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
                        {searchResult.map((item, idx) => (
                            <tr key={idx}>
                                <td>
                                    <button className={styles.DeleteBtn}>삭제</button>
                                </td>
                                <td><Link to={`/${item.plId}`} className={styles.plName}>{item.plId}</Link></td>
                                <td><Link to={`/${item.plId}`} className={styles.plName}>{item.plName}</Link></td>
                                <td><Link to={`/${item.plId}`} className={styles.plName}>{item.plHour}</Link></td>
                                <td><Link to={`/${item.plId}`} className={styles.plName}>{item.plTel}</Link></td>
                                <td><Link to={`/${item.plId}`} className={styles.plName}>{item.plAddress}</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
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
            <footer className={styles.footer}>하단바</footer>
        </div>
    );
};

export default PL;
