import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import CoNumberRing from "./../co_numberring_components/CoNumberRing";
import SubTitleCO from "../SubTitles/SubTitleCO";
import styles from "./css/co.module.css";
import axios from "axios";

export default function Co() {
    const [coText, setCoText] = useState('');
    const [result, setResult] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [pagination, setPagination] = useState({ totalPages: 0, currentPage: 1 });
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        }
    }, []);

    const convenienceList = async () => {
        try {
            const response = await axios.get('http://localhost:9999/conven/list', {
                params: { coText, page, limit }
            });
            const contents = response.data.contents || [];
            setResult(contents);
            setPagination({
                totalPages: response.data.pagination.totalPages,
                currentPage: page,
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        convenienceList();
    }, [page, limit]);

    const CoSearchClick = () => {
        if (!coText.trim()) {
            alert('검색어를 입력해주세요.');
            return;
        }
        setPage(1);
        convenienceList();
    };

    const handlePageChange = (number) => {
        setPage(number);
    };

    const renderTable = useCallback(() => {
        return (
            <table className={styles.co_list_container}>
                <thead>
                    <tr className={styles.co_list_thead}>
                        <th className={styles.co_list_th}></th>
                        <th className={styles.co_list_th}>번호</th>
                        <th className={styles.co_list_th}>분류명</th>
                        <th className={styles.co_list_th}>업종명</th>
                        <th className={styles.co_list_th}>업종운영시간</th>
                        <th className={styles.co_list_th}>전화번호</th>
                        <th className={styles.co_list_th}>주소</th>
                        <th className={styles.co_list_th}>상세정보</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((city, index) => (
                        <tr key={index} className={styles.co_list_tr}>
                            <td className={styles.co_list_td}>
                                {user && user.boardMemberGradeNo === 0 ? (
                                    <button className={styles.co_deleteBtn}>삭제</button>
                                ) : null}
                            </td>
                            <td className={styles.co_list_td}>{city.coId}</td>
                            <td className={styles.co_list_td}>{city.coDistinction}</td>
                            <td className={styles.co_list_td}>{city.coName}</td>
                            <td className={styles.co_list_td}>{city.coHour}</td>
                            <td className={styles.co_list_td}>{city.coTel}</td>
                            <td className={styles.co_list_td}>{city.coAddress}</td>
                            <td className={styles.co_list_td}><Link to={`/coinfo/${city.coId}`} className={styles.co_list_link}>이동</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }, [result, user]);

    return (
        <div className={styles.co_main_container}>
            <SubTitleCO />
            <div className={styles.co_search_and_result_container}>
                <div className={styles.co_search_container}>
                    <input
                        className={styles.search_input_co}
                        type="text"
                        value={coText}
                        placeholder="지역 입력"
                        onChange={(e) => setCoText(e.target.value)}
                    />
                    <button className={styles.searchBtn_co} onClick={CoSearchClick}>조회</button>
                </div>
                <div className={styles.co_searchResult_container}>
                    {result.length > 0 && renderTable()}
                </div>
            </div>
            <div>
                <CoNumberRing onNumberRing={handlePageChange} pagination={pagination} />
            </div>
        </div>
    );
};
