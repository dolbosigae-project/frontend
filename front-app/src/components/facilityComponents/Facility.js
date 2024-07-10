import React, { useEffect, useState } from 'react';
import styles from './../../css/facility_css/facility.css';
import { Route, Router } from 'react-router-dom';
import axios from 'axios';
import {CreateHeader} from './../Header';
import { useState } from 'react';
function Facility() {
    const [parkName, setParkName] = useState();
    const [accessTime, setAccessTime] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [roadAddress, setRoadAddress] = useState();
   
    const facilityApi = axios.create({
        url: ('https://localhost:9999/facility/list',{
            parkName : parkName,
            accessTime : accessTime,
            phoneNumber : phoneNumber,
            roadAddress : roadAddress
        })
    });
    const search_click = async(e) =>{
        const response = await axios.get('https://localhost:9999/facility/search',{
            parkName : parkName,
            accessTime : accessTime,
            phoneNumber : phoneNumber,
            roadAddress : roadAddress
        });
}
    return (
        <div className={styles.main_container}>
            <header>
              여기 해더 자리
            </header>
            <div className={styles.middle_container}>
                여기 메인 이미지 자리
                <button className={styles.menubar}>메뉴바</button>
                <button className={styles.menubar}>메뉴바</button>
            </div>
            <div className={styles.search_container}>
                   <p className={styles.city}>읍/면/동</p>
                   <select className={styles.select_bar}>
                        <option className={styles.city_option}>전체</option>
                        <option className={styles.city_option}>성남</option>
                        <option className={styles.city_option}>수원</option>
                        <option className={styles.city_option}>안양</option>
                        <option className={styles.city_option}>평택</option>
                        <option className={styles.city_option}>안산</option>
                        <option className={styles.city_option}>고양</option>
                        <option className={styles.city_option}>용인</option>
                        <option className={styles.city_option}>이천</option>
                        <option className={styles.city_option}>김포</option>
                        <option className={styles.city_option}>화성</option>
                        <option className={styles.city_option}>양주</option>
                        <option className={styles.city_option}>구리</option>
                   </select>
                   <button className={styles.btn_search} onSubmit={search_click}>조회</button>
            </div>
            <div className={styles.facility_graph}>
                <form onSubmit={facilityApi}>
                    <table>
                        <thead>
                            <tr>
                                <th>공원 명</th>
                                    <th>출입 허용 시간</th>
                                <th>전화번호</th>
                                <th>도로명주소</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={styles.td}
                                    id='parkName'
                                    onChange={(e) => setParkName(e.target.value)}>
                                </td>
                                <td className={styles.td}
                                    id='accessTime'
                                    onChange={(e) => setAccessTime(e.target.value)}>
                                </td>
                                <td className={styles.td}
                                    id='phoneNumber'
                                    onChange={(e) => setPhoneNumber(e.target.value)}>
                                </td>
                                <td className={styles.td}
                                    id='roadAddress'
                                    onChange={(e) => setRoadAddress(e.target.value)}>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
}

export default Facility;