import React, { useEffect, useState } from 'react';
import styles from '../../css/poci_css/plSelectDong.module.css';

const Select1 = () => (
    <select className={styles.select_su_dong}>
        <option>선택</option>
        <option>수진동</option>
        <option>삼평동</option>
        <option>정자동</option>
        <option>수내동</option>
        <option>단대동</option>
        <option>구미동</option>
        <option>율동</option>
    </select>
);

const Select2 = () => (
    <select className={styles.select_su_dong}>
            <option>선택</option>
            <option>하동</option>
            <option>권선동</option>
            <option>금곡동</option>
    </select>
);

const Select3 = () => (
    <select className={styles.select_su_dong}>
        <option>선택</option>
        <option>석수동</option>
    </select>
);

const Select4 = () => (
    <select className={styles.select_su_dong}>
        <option>선택</option>
        <option>성곡동</option>
    </select>
);

const Select5 = () => (
    <select className={styles.select_su_dong}>
        <option>선택</option>
        <option>동삭동</option>
        <option>팽성읍</option>
        <option>청북읍</option>
        <option>오성면</option>
        <option>포승읍</option>
        <option>이충동</option>
    </select>
);

const Select6 = () => (
    <select className={styles.select_su_dong}>
        <option>선택</option>
        <option>상하동</option>
        <option>하갈동</option>
        <option>상현동</option>
    </select>
);

const Select7 = () => (
    <select className={styles.select_su_dong}>
        <option>선택</option>
        <option>장호원읍</option>
        <option>부발읍</option>
    </select>
);

const Select8 = () => (
    <select className={styles.select_su_dong}>
        <option>선택</option>
        <option>하성면</option>
    </select>
);

const Select9 = () => (
    <select className={styles.select_su_dong}>
        <option>선택</option>
        <option>오산동</option>
        <option>정남면</option>
    </select>
);

const Select10 = () => (
    <select className={styles.select_su_dong}>
        <option>선택</option>
        <option>옥정동</option>
    </select>
);

const Select11 = () => (
    <select className={styles.select_su_dong}>
        <option>선택</option>
        <option>교문동</option>
    </select>
);

const Select12 = () => (
    <select className={styles.select_su_dong}>
        <option>선택</option>
        <option>일산동구</option>
        <option>일산서구</option>
        <option>동산동</option>
    </select>
);


const PlselectDong = ({selectPlCity, setSelectPlCity}) => {

    const SelectOption = (e) => {
        setSelectPlCity(e.target.value);
    };

    const SearchCity = () => {
        switch (selectPlCity) {
            case '1':
                return <Select1 />;
            case '2':
                return <Select2 />;
            case '3':
                return <Select3 />;
            case '4':
                return <Select4 />;
            case '5':
                return <Select5 />;
            case '6':
                return <Select6 />;
            case '7':
                return <Select7 />;
            case '8':
                return <Select8 />;
            case '9':
                return <Select9 />;
            case '10':
                return <Select10 />;
            case '11':
                return <Select11 />;
            case '12':
                return <Select12 />;
            default:
                return null;
        }
    };

    
    return (
        <div className={styles.Search_mainContainer}>
            <form>
            <select className={styles.select_gu} onChange={SelectOption}>
                <option>선택</option>
                <option className={styles.option} value="1">성남시</option>
                <option className={styles.option} value="2">수원시</option>
                <option className={styles.option} value="3">안양시</option>
                <option className={styles.option} value="4">안산시</option>
                <option className={styles.option} value="5">평택시</option>
                <option className={styles.option} value="6">용인시</option>
                <option className={styles.option} value="7">이천시</option>
                <option className={styles.option} value="8">김포시</option>
                <option className={styles.option} value="9">화성시</option>
                <option className={styles.option} value="10">양주시</option>
                <option className={styles.option} value="11">구리시</option>
                <option className={styles.option} value="12">고양시</option>
            </select>
                </form>
            <div className={styles.Search_City}>
                {SearchCity()}
            </div>
        </div>
    );
};

export default PlselectDong;