import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlSelectCity from './PlSearchCity';
import styles from '../../css/poci_css/pl.module.css';
import { Link } from 'react-router-dom';
const PAGE_GROUP_SIZE = 5;

const PL = () => {
    const [plId, setPlId] = useState('');
    const [plName, setPlName] = useState('');
    const [plHour, setPlHour] = useState('');
    const [plTel, setPlTel] = useState('');
    const [plAddress, setPlAddress] = useState('');
    const [plText, setPlText] = useState('');
    const [result, setResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pagination, setPagination] = useState();

    useEffect(() => {
        const cityList = async () => {
            try{
                const response = await axios.get('http://localhost:9999/city/list');
                setResult(response.data.citys);
                setPagination(response.data.pagination);
            }catch(error){
                console.log(error);
            }
        }
        cityList();
    },[]);

    const searchClick = async() => {
            try{
            const response = await axios.get("http://localhost:9999/search/city?plText=${plText}");
            setResult(response.data);
        }catch (error){
            console.log(error);
        }
    };

    const handlePageChange = (pageNo) => {
    setCurrentPage(pageNo);
    };

  const pageGroupStart = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
  const pageGroupEnd = Math.min(pageGroupStart + PAGE_GROUP_SIZE - 1, totalPages);
  const previousPageGroup = pageGroupStart > 1;
  const nextPageGroup = pageGroupEnd < totalPages;

////////////////////////////////////////////////////////////////////////////////////////////////////////////
   

    return (
        <div className={styles.container}>
            <header>
                <Link to="/">놀이</Link>
            </header>
            <div className={styles.main_Image}>
                <h2 className={styles.sub_title}>놀이시설 찾기</h2>
                <img className={styles.logo_white} />
                <div className={styles.search_container}>
                    <input 
                        type="text"
                        value={plText}
                        onChange={(e) => setPlText(e.target.value)}
                        placeholder="지역 입력"
                    />
                    <button onClick={searchClick}>조회</button>
                </div>
            </div>
            <div className={styles.info_container}>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>번호</th>
                            <th>공원명</th>
                            <th>출입 허용 시간</th>
                            <th>전화번호</th>
                            <th>도로명 주소</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={result.id}>
                            <td>
                                <button className={styles.DeleteBtn}>삭제</button>
                            </td>
                            <td><Link to={`${result.plId}`} className={styles.plName}>{result.plId}</Link></td>
                                <td><Link to={`${result.plId}`} className={styles.plName}>{result.plName}</Link></td>
                                <td><Link to={`${result.plId}`} className={styles.plName}>{result.plHour}</Link></td>
                                <td><Link to={`${result.plId}`} className={styles.plName}>{result.plTel}</Link></td>
                                <td><Link to={`${result.plId}`} className={styles.plName}>{result.plAddress}</Link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="pagination">
            {previousPageGroup && (
                    <button onClick={() => handlePageChange(pagination.PageOfPageGroup - 1)}>◀</button>
                  )}
                  {pagination && Array.from({ length: pagination.endPageOfPageGroup - pagination.startPageOfPageGroup + 1 }, (_, i) => (
                    <button
                      key={i + pagination.startPageOfPageGroup}
                      onClick={() => handlePageChange(i + pagination.startPageOfPageGroup)}
                      className={pagination.currentPage === i + pagination.startPageOfPageGroup ? styles.activePage : ''}
                    >
                      {i + pagination.startPageOfPageGroup}
                    </button>
                  ))}
                  {nextPageGroup && (
                    <button onClick={() => handlePageChange(pagination.endPageOfPageGroup + 1)}>▶</button>
                  )}
            </div>
            <footer className={styles.footer}>하단바</footer>
        </div>
    );
};

export default PL;