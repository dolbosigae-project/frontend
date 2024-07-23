import React from 'react';
<<<<<<< HEAD
import styles from './plNumberRing.css/plNumberRing.module.css'
=======

>>>>>>> origin/main
const PlNumberRing = ({ onNumberRing, pagination }) => {
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

<<<<<<< HEAD
    console.log(pages); // 로그 추가

    return (
        <div className={styles.numberRing_Container}>
            {currentPageGroup > 1 && (
                <>
                    <button onClick={() => onNumberRing(1)} className={styles.leftAllButton}>&lt;&lt;</button>
                    <button onClick={() => onNumberRing(startPage - 1)} className={styles.leftButton}>&lt;</button>
=======
    console.log("PlNumberRing pages: ", pages); // 로그 추가

    return (
        <div>
            {currentPageGroup > 1 && (
                <>
                    <button onClick={() => onNumberRing(1)}>&lt;&lt;</button>
                    <button onClick={() => onNumberRing(startPage - 1)}>&lt;</button>
>>>>>>> origin/main
                </>
            )}
            {pages.map((number) => (
                <button
                    key={number}
                    onClick={() => onNumberRing(number)}
                    style={{ fontWeight: number === currentPage ? 'bold' : 'normal' }}
<<<<<<< HEAD
                    className={styles.numberButton}
=======
>>>>>>> origin/main
                >
                    {number}
                </button>
            ))}
            {currentPageGroup < Math.ceil(totalPages / pageGroupSize) && (
                <>
<<<<<<< HEAD
                    <button onClick={() => onNumberRing(endPage + 1)} className={styles.rightAllButton}>&gt;</button>
                    <button onClick={() => onNumberRing(totalPages)} className={styles.rightAllButton}>&gt;&gt;</button>
=======
                    <button onClick={() => onNumberRing(endPage + 1)}>&gt;</button>
                    <button onClick={() => onNumberRing(totalPages)}>&gt;&gt;</button>
>>>>>>> origin/main
                </>
            )}
        </div>
    );
};

<<<<<<< HEAD
export default PlNumberRing;
=======
export default PlNumberRing;
>>>>>>> origin/main
