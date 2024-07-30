import SubTitleAB from './SubTitles/SubTitleAB';
import styles from '../css/ABList.module.css'

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function ABList() {
    const [ABList, setABList] = useState([]);
    const [pagination, setPagination] = useState(null);

    useEffect(()=>{
        const readData = async() => {
            try {
                const response = await axios.get('http://localhost:9999/abs/list');
                console.log('Data', response.data);
            } catch(error){
                console.error("유기견 정보를 가져오는 중 에러 발생", error);
            }
        }
        readData();
    }, []);


    return(
        <div>
            <SubTitleAB />
            <div className={styles.ABContainer}>
                <ul>
                    {ABList.map((ab) => (
                    <li></li>
                ))}
                </ul>
            </div>
        </div>
    );
}