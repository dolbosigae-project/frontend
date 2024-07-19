import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ABList = (shID) =>{
    const [abList, setAbList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageContentCount, setPageContentCount] = useState(6);
    const [totalPage, setTotalPage] = useState(1);
    const PAGE_GROUP_OF_COUNT = 5;

    useEffect(() => {
        const fetchABList = async () => {
            try {
                const response = await axios.get(`http://localhost:9999/ab`, {
                    params: {
                        shID,
                        pageNo: currentPage,
                        pageContentEa: pageContentCount
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
    }, [currentPage, pageContentCount, shID]);

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

    const isOverAWeek = (dateString) => {
        const abDate = new Date(dateString);
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate - abDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 7;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="ab-list">
            <h1>AB List</h1>
            <div className="ab-cards">
                {abList.map((ab) => (
                    <Link to={`/ab/${ab.abID}`} key={ab.abID} className="ab-card">
                       <div className="ab-image">
                            {/* Assuming ab.abImage contains the URL to the image */}
                            <img src={ab.abImage} alt={ab.abBreed} />
                        </div>
                        <div className="ab-info">
                            <p>보호종 : {ab.abBreed}</p>
                            <p>발견 장소 : {ab.abLocation}</p>
                            <p>특징 : {ab.abCharacter}</p>
                            {isOverAWeek(ab.abDate) && (
                                <p className="adoptable">입양가능</p>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
            <div className="pagination">
                {renderPageNumbers()}
            </div>
        </div>
    );
};

export default ABList;