import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';
import styles from './css/pl.module.css';
import PlNumberRing from '../../pl_numberring_component/PlNumberRing';

const PL = () => {
    const [plText, setPlText] = useState('');
    const [result, setResult] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [pagination, setPagination] = useState({ totalPages: 0, currentPage: 1 });
    const [plUser, setPlAdmin] = useState(false);

    useEffect(() => {
        const PlUserInfo = async() => {
            try{
            const response = await axios.get('http://localhost:9999/city/admin');
            setPlAdmin(response.data.plAdmin);// 백엔드에서 관리자정보 받을 수 있는 dto만들고 시작
        }catch(error){
            console.log("사용자 정보를 가져오는데 실패하였습니다.");
        }
    }
    PlUserInfo();
},[]);

    const cityList = async () => {
        try {
            const response = await axios.get('http://localhost:9999/city/list', {
                params: { plText, page, limit }
            });
            const contents = response.data.contents || [];
            setResult(contents);
            setPagination({
                totalPages: response.data.pagination.totalPages,
                currentPage: page,
            });
        } catch (error) {
            console.log('서버에러:', error);
        }
    };

    useEffect(() => {
        cityList();
    }, [page, limit]);

    const searchClick = async () => {
        if(!plText.trim()){
            alert("지역을 입력해주세요");
            return;
        }
        setPage(1);
        cityList();
    };

    const onNumberRing = (number) => {
        setPage(number);
    };

    const deleteClick = async(id) => {
        try{
            const response = await axios.delete(`http://localhost:9999/city/delete/${id}`)
            if(response.status === 200){
                alert("삭제되었습니다.");
                cityList(); 
            }else{
                alert("작성자만 삭제할 수 있습니다.");
            }
        }catch(error){
            alert("삭제 요청 오류 : ", error);
            console.log(error)
        }
    }

    const renderTable = useCallback(() => (
        <table className={styles.list_container}>
            <thead>
                <tr className={styles.list_thead}>
                    <th className={styles.list_th}></th>
                    <th className={styles.list_th}>번호</th>
                    <th className={styles.list_th}>공원명</th>
                    <th className={styles.list_th}>출입 허용 시간</th>
                    <th className={styles.list_th}>전화번호</th>
                    <th className={styles.list_th}>도로명 주소</th>
                    <th className={styles.list_th}>상세정보</th>
                </tr>
            </thead>
            <tbody>
                {result.map((city, index) => (
                    <tr key={index} className={styles.list_tdAll}>
                        <td className={styles.list_td}>
                        {plUser && (
                                <button className={styles.DeleteBtn} onClick={() => deleteClick(city.plId)}>삭제</button>
                            )}
                        </td>
                        <td className={styles.list_td}>{city.plId}</td>
                        <td className={styles.list_td}>{city.plName}</td>
                        <td className={styles.list_td}>{city.plHour}</td>
                        <td className={styles.list_td}>{city.plTel}</td>
                        <td className={styles.list_td}>{city.plAddress}</td>
                        <td className={styles.list_td}><Link to={`/plinfo/${city.plId}`} className={styles.list_Link}>이동</Link></td>
                    </tr>
                ))}
            </tbody>
        </table>
    ), [result, plUser]);

    return (
        <div className={styles.plMain_container}>
            <img className={styles.Img}/>
            <div className={styles.main_Image}>
                <div className={styles.search_container}>
                    <input
                        className={styles.search_input}
                        type="text"
                        value={plText}
                        placeholder="지역 입력"
                        onChange={(e) => setPlText(e.target.value)}
                    />
                    <button onClick={searchClick} className={styles.searchBtn}>조회</button>
                    
                </div>
                <div className={styles.searchResult_container}>
                    {result.length > 0 && renderTable()}
                </div>
            </div>
            <div>
                <PlNumberRing onNumberRing={onNumberRing} pagination={pagination} />
            </div>
            <footer className={styles.footer}>하단바</footer>
        </div>
    );
};

export default PL;
