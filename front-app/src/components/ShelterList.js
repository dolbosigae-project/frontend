import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ShelterFilter from './ShelterFilter';
import Pagination from './Pagination';

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

    const query = new URLSearchParams(location.search);
    const queryPageNo = parseInt(query.get('pageNo')) || 1;
    const queryPageCount = parseInt(query.get('pageContentEa')) || 10;

    useEffect(() => {
        setCurrentPage(queryPageNo);
        setPageOfContentCount(queryPageCount);
    }, [location.search]);

    useEffect(() => {
        fetchShelters(currentPage, pageOfContentCount);
    }, [currentPage, pageOfContentCount]);

    const fetchShelters = async (pageNo, pageCount) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:9999/shelter?pageNo=${pageNo}&pageContentEa=${pageCount}`);
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
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        navigate(`?pageNo=${page}&pageContentEa=${pageOfContentCount}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const filteredShelters = shelters.filter(shelter => {
        return (selectedRegion === '선택' || shelter.shRegion === selectedRegion) &&
               (searchKeyword === '' || shelter.shName.includes(searchKeyword));
    });

    const startIdx = (currentPage - 1) * pageOfContentCount;
    const endIdx = startIdx + pageOfContentCount;
    const currentPageShelters = filteredShelters.slice(startIdx, endIdx);

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
