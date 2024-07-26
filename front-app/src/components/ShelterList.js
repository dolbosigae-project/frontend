import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ShelterFilter from './ShelterFilter';
import Pagination from './Pagination';

const ShelterList = () => {
    const [shelters, setShelters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState('선택');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageOfContentCount, setPageOfContentCount] = useState(10);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {
        fetchShelters(currentPage);
    }, [currentPage]);

    const fetchShelters = async (page) => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:9999/shelters', {
                params: {
                    pageNo: page,
                    pageContentEa: pageOfContentCount
                }
            });
            console.log('Response Data:', response.data);
            setShelters(response.data.list);
            setTotalPage(response.data.totalPage);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (region, keyword) => {
        setSelectedRegion(region);
        setSearchKeyword(keyword);
        setCurrentPage(1); // 필터 변경 시 페이지를 1로 리셋
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // 필터링된 데이터
    const filteredShelters = shelters.filter(shelter => {
        return (selectedRegion === '선택' || shelter.shRegion === selectedRegion) &&
               (searchKeyword === '' || shelter.shName.includes(searchKeyword));
    });

    // 현재 페이지의 데이터 계산
    const startIdx = (currentPage - 1) * pageOfContentCount;
    const endIdx = startIdx + pageOfContentCount;
    const currentPageShelters = filteredShelters.slice(startIdx, endIdx);

    console.log('Filtered Shelters:', filteredShelters);
    console.log('Current Page Shelters:', currentPageShelters);

    return (
        <div className="shelter-list">
            <h1>Shelter List</h1>
            <ShelterFilter onFilterChange={handleFilterChange} />
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
                    {currentPageShelters.length > 0 ? (
                        currentPageShelters.map((shelter) => (
                            <tr key={shelter.shID}>
                                <td>{shelter.shRegion}</td>
                                <td>
                                    <Link to={`/shelters/${shelter.shID}`}>
                                        {shelter.shName}
                                    </Link>
                                </td>
                                <td>{shelter.shTel}</td>
                                <td>{shelter.shAddress}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No shelters available</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination 
                currentPage={currentPage}
                totalPage={totalPage}
                pageOfContentCount={pageOfContentCount}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default ShelterList;
