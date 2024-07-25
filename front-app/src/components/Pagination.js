import React from 'react';

const Pagination = ({ currentPage, totalPage, pageOfContentCount, onPageChange }) => {
    const PAGE_GROUP_OF_COUNT = 5;

    const totalPageGroup = Math.ceil(totalPage / PAGE_GROUP_OF_COUNT);
    const currentPageGroupNo = Math.ceil(currentPage / PAGE_GROUP_OF_COUNT);
    const startPageOfPageGroup = (currentPageGroupNo - 1) * PAGE_GROUP_OF_COUNT + 1;
    const endPageOfPageGroup = Math.min(currentPageGroupNo * PAGE_GROUP_OF_COUNT, totalPage);

    const pages = [];
    if (currentPageGroupNo > 1) {
        pages.push(
            <button key="prev" onClick={() => onPageChange(startPageOfPageGroup - PAGE_GROUP_OF_COUNT)} disabled={currentPageGroupNo === 1}>
                ◀
            </button>
        );
    }
    for (let i = startPageOfPageGroup; i <= endPageOfPageGroup; i++) {
        pages.push(
            <button key={i} onClick={() => onPageChange(i)} className={i === currentPage ? 'active' : ''}>
                {i}
            </button>
        );
    }
    if (currentPageGroupNo < totalPageGroup) {
        pages.push(
            <button key="next" onClick={() => onPageChange(endPageOfPageGroup + 1)} disabled={currentPageGroupNo === totalPageGroup}>
                ▶
            </button>
        );
    }

    return (
        <div className="pagination">
            {pages}
        </div>
    );
};

export default Pagination;
