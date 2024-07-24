import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const ShelterList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [shelters, setShelters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState('선택');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageOfContentCount, setPageOfContentCount] = useState(10);
    const [totalPage, setTotalPage] = useState(1);
    const PAGE_GROUP_OF_COUNT = 5;

    const query = new URLSearchParams(location.search);
    const queryPageNo = parseInt(query.get('pageNo')) || 1;
    const queryPageCount = parseInt(query.get('pageContentEa')) || 10;

    useEffect(() => {
        setCurrentPage(queryPageNo);
        setPageOfContentCount(queryPageCount);
    }, [location.search]);

    useEffect(() => {
        fetchShelters(currentPage, pageOfContentCount);
    }, [currentPage, pageOfContentCount]); // currentPage와 pageOfContentCount가 변경될 때마다 실행

    const fetchShelters = async (pageNo, pageCount) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:9999/shelter?pageNo=${pageNo}&pageContentEa=${pageCount}`);
            console.log("Fetched shelters:", response.data); // 데이터 확인
            setShelters(response.data.list);
            setTotalPage(response.data.totalPage);
        } catch (error) {
            console.error("Failed to fetch shelters:", error); // 에러 확인
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        filterShelters();
    }, [selectedRegion, searchKeyword, shelters]);

    const handleFilterChange = (event) => {
        setSelectedRegion(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchKeyword(event.target.value);
    };

    const filterShelters = () => {
        let filtered = shelters;

        if (selectedRegion !== '선택') {
            filtered = filtered.filter(shelter => shelter.shRegion === selectedRegion);
        }

        if (searchKeyword.trim() !== '') {
            filtered = filtered.filter(shelter => shelter.shName.includes(searchKeyword));
        }

        console.log("Filtered shelters:", filtered); // 필터링된 데이터 확인
        setShelters(filtered);
    };

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPage) return; // 페이지 번호 유효성 검사
        setCurrentPage(page); // 페이지 번호 업데이트
        navigate(`?pageNo=${page}&pageContentEa=${pageOfContentCount}`); // URL 업데이트
    };

    const renderPageNumbers = () => {
        const totalPageGroup = Math.ceil(totalPage / PAGE_GROUP_OF_COUNT);
        const currentPageGroupNo = Math.ceil(currentPage / PAGE_GROUP_OF_COUNT);
        const startPageOfPageGroup = (currentPageGroupNo - 1) * PAGE_GROUP_OF_COUNT + 1;
        const endPageOfPageGroup = Math.min(currentPageGroupNo * PAGE_GROUP_OF_COUNT, totalPage);
        const pages = [];
    
        if (currentPageGroupNo > 1) {
            pages.push(
                <button key="prev" onClick={() => handlePageChange(startPageOfPageGroup - PAGE_GROUP_OF_COUNT)}>
                    ◀
                </button>
            );
        }
    
        for (let i = startPageOfPageGroup; i <= endPageOfPageGroup; i++) {
            pages.push(
                <button key={i} onClick={() => handlePageChange(i)} className={i === currentPage ? 'active' : ''}>
                    {i}
                </button>
            );
        }
    
        if (currentPageGroupNo < totalPageGroup) {
            pages.push(
                <button key="next" onClick={() => handlePageChange(startPageOfPageGroup + PAGE_GROUP_OF_COUNT)}>
                    ▶
                </button>
            );
        }
    
        return pages;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // 페이지에 맞는 데이터 계산
    const startIdx = (currentPage - 1) * pageOfContentCount;
    const endIdx = startIdx + pageOfContentCount;

    // 필터링된 데이터를 페이지별로 나누기
    const currentPageShelters = shelters.slice(startIdx, endIdx);

    console.log("Current page shelters:", currentPageShelters); // 현재 페이지의 데이터 확인

    return (
        <div className="shelter-list">
            <h1>Shelter List</h1>
            <div className="filter">
                <select value={selectedRegion} onChange={handleFilterChange}>
                    <option>선택</option>
                    {['가평군', '고양시', '과천시', '광명시', '광주시', '구리시', '남양주시', '동두천시', '부천시', '성남시', '수원시', '시흥시', 
                    '안산시', '양주시', '양평군', '연천군', '용인시', '의왕시', '의정부시', '평택시', '하남시', '화성시'].map(region => (
                        <option key={region} value={region}>{region}</option>
                    ))}
                </select>
                <input
                    type="text"
                    value={searchKeyword}
                    onChange={handleSearchChange}
                    placeholder="센터명을 입력하세요"
                />
                <button onClick={filterShelters}>조회</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>센터지역</th>
                        <th>센터명</th>
                        <th>센터번호</th>
                        <th>센터주소</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPageShelters.map((shelter) => (
                        <tr key={shelter.shID}>
                            <td>{shelter.shRegion}</td>
                            <td>
                                <Link to={`/shelter/${shelter.shID}`}>
                                    {shelter.shName}
                                </Link>
                            </td>
                            <td>{shelter.shTel}</td>
                            <td>{shelter.shAddress}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                {renderPageNumbers()}
            </div>
        </div>
    );
};

export default ShelterList;
