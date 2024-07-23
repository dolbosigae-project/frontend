import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ShelterList = () => {
    const [shelters, setShelters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState('선택');
    const [filteredShelters, setFilteredShelters] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageOfContentCount, setPageOfContentCount] = useState(10);
    const [totalPage, setTotalPage] = useState(1);
    const PAGE_GROUP_OF_COUNT = 5;

    useEffect(() => {
        const fetchShelters = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:9999/shelter?pageNo=${currentPage}&pageContentEa=${pageOfContentCount}`);
                setShelters(response.data.list);
                setFilteredShelters(response.data.list);
                setTotalPage(response.data.totalPage);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchShelters();
    }, [currentPage, pageOfContentCount]);

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

        setFilteredShelters(filtered);
        setCurrentPage(1); // 필터링 후 페이지를 처음으로 설정
    };

    const renderPageNumbers = () => {
        const totalPageGroup = Math.ceil(totalPage / PAGE_GROUP_OF_COUNT);
        const currentPageGroupNo = Math.ceil(currentPage / PAGE_GROUP_OF_COUNT);
        const startPageOfPageGroup = (currentPageGroupNo - 1) * PAGE_GROUP_OF_COUNT + 1;
        const endPageOfPageGroup = Math.min(currentPageGroupNo * PAGE_GROUP_OF_COUNT, totalPage);
        const pages = [];

        if (currentPageGroupNo > 1) {
            pages.push(
                <button key="prev" onClick={() => setCurrentPage(startPageOfPageGroup - 1)}>
                    ◀
                </button>
            );
        }

        for (let i = startPageOfPageGroup; i <= endPageOfPageGroup; i++) {
            pages.push(
                <button key={i} onClick={() => setCurrentPage(i)} className={i === currentPage ? 'active' : ''}>
                    {i}
                </button>
            );
        }

        if (currentPageGroupNo < totalPageGroup) {
            pages.push(
                <button key="next" onClick={() => setCurrentPage(endPageOfPageGroup + 1)}>
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
                    {filteredShelters.slice((currentPage - 1) * pageOfContentCount, currentPage * pageOfContentCount).map((shelter) => (
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
