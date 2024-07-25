import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import ABCardList from './ABCardList';
import ABFilter from './ABFilter';
// import styles from '../css/abList.module.css';

const ABList = ({ shID }) => {
    const [abList, setAbList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageContentCount, setPageContentCount] = useState(6); // 한 페이지에 6개 항목 표시
    const [totalPage, setTotalPage] = useState(1);
    const [filter, setFilter] = useState({
        region: '',
        centerName: '',
        startDate: '',
        endDate: '',
        breed: ''
    });

    useEffect(() => {
        const fetchABList = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:9999/ab`, {
                    params: {
                        shID,
                        pageNo: currentPage,
                        pageContentEa: pageContentCount,
                        ...filter
                    }
                });
                setAbList(response.data.list);
                setTotalPage(response.data.totalPage);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchABList();
    }, [currentPage, pageContentCount, shID, filter]);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setCurrentPage(1); // 검색 조건이 변경되면 첫 페이지로 이동
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className={styles.ab_list}>
            <h2>보호 중인 동물 목록</h2>
            <ABFilter onFilterChange={handleFilterChange} />
            <ABCardList abList={abList} />
            <Pagination
                currentPage={currentPage}
                totalPage={totalPage}
                setCurrentPage={setCurrentPage}
                pageGroupCount={5}
            />
        </div>
    );
};

export default ABList;
