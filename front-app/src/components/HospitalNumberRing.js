import React from 'react';

const HospitalNumberRing  = ({ onNumberRing, pagination }) => {
    const totalPages = pagination.totalPages;
    const currentPage = pagination.currentPage;
    const pageGroupSize = 5;
    const currentPageGroup = Math.ceil(currentPage / pageGroupSize);
    const startPage = (currentPageGroup - 1) * pageGroupSize + 1;
    const endPage = Math.min(currentPageGroup * pageGroupSize, totalPages);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    console.log("HospitalNumberRing pages: ", pages); // 로그 추가

    return (
        <div>
            {currentPageGroup > 1 && (
                <>
                    <button onClick={() => onNumberRing(1)}>&lt;&lt;</button>
                    <button onClick={() => onNumberRing(startPage - 1)}>&lt;</button>
                </>
            )}
            {pages.map((number) => (
                <button
                    key={number}
                    onClick={() => onNumberRing(number)}
                    style={{ fontWeight: number === currentPage ? 'bold' : 'normal' }}
                >
                    {number}
                </button>
            ))}
            {currentPageGroup < Math.ceil(totalPages / pageGroupSize) && (
                <>
                    <button onClick={() => onNumberRing(endPage + 1)}>&gt;</button>
                    <button onClick={() => onNumberRing(totalPages)}>&gt;&gt;</button>
                </>
            )}
        </div>
    );
};

export default HospitalNumberRing;