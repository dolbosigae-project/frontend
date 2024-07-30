import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/ABCardList.module.css';

const isOverAWeek = (dateString) => {
    const abDate = new Date(dateString);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - abDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 7;
};

const ABCardList = ({ abList }) => {
    return (
        <div className={styles.ab_cards}>
            {abList.length > 0 ? (
                abList.map((ab) => (
                    <Link to={`/abdetail/${ab.abID}`} key={ab.abID} className={styles.ab_card}>
                        <div className={styles.ab_image}>
                            <img src={ab.abImg} alt={ab.abBreed} />
                        </div>
                        <div className={styles.ab_info}>
                            <p>보호종: {ab.abBreed}</p>
                            <p>발견 장소: {ab.abLocation}</p>
                            <p>특징: {ab.abCharacter}</p>
                            {isOverAWeek(ab.abDate) && (
                                <p className={styles.adoptable}>입양가능</p>
                            )}
                        </div>
                    </Link>
                ))
            ) : (
                <div className={styles.noResults}>No animals found</div>
            )}
        </div>
    );
};

export default ABCardList;
