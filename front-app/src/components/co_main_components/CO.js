import { Link } from "react-router-dom";

import SubTitlePL from "../SubTitles/SubTitlePL";
import styles from "./css/co.module.css";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export default function Co() {
    const [coText, setCoText] = useState('');
    const [result, setResult] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [pagination, setPagination] = useState({ totalPages: 0, currentPage: 1 })
    const [user, setUser] = useState(null);
    //유저 정보 받아옴(관리자 유저 색출)
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        }
    }, []);

    const convenienceList = async () => {
        try {
            const response = await axios.get('http://localhost/conven/list', {
                params: { coText, page, limit }
            });
            const contents = response.data.contents || [];
            setResult(contents);
            setPagination({
                totalPages: response.data.pagination.totalPages,
                currentPage: page,
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        convenienceList();
    }, [page, limit]);

    const CoSearchClick = () => {
        if (!coText) {
            alert('검색어를 입력해주세요.');
        }
        setPage(1);
        convenienceList();
    }

    const readerTable = useCallback(() => {
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>번호</th>
                    <th>분류명</th>
                    <th>업종명</th>
                    <th>업종운영시간</th>
                    <th>전화번호</th>
                    <th>주소</th>
                </tr>
            </thead>
            <tbody>
                {result.map((city, index) => (
                    <tr key={index}>
                        <td><button>삭제</button></td>
                        <td>${city.coNo}</td>
                        <td>${city.coDistinction}</td>
                        <td>${city.coName}</td>
                        <td>${city.coHour}</td>
                        <td>${city.coTel}</td>
                        <td>${city.coAddress}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    })

    return (
        <div className={styles.co_main_container}>
            <div className={styles.SubTitleCo_container}>
                <SubTitlePL />
            </div>
            <div>
                <input
                    className={styles.search_input_co}
                    type="text"
                    value={coText}
                    placeholder="지역 입력"
                    onChange={(e) => setCoText(e.target.value)}
                />
                <button className={styles.searchBtn_co} onClick={CoSearchClick}>조회</button>
            </div>
        </div>
    )
};
