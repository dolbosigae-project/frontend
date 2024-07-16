import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlSelectDong from './PlSelectDong';
import styles from '../../css/poci_css/pl.module.css';
import { Link } from 'react-router-dom';

const PAGE_GROUP_SIZE = 5;


const PL = () => {
    const [plId, setPlId] = useState('');
    const [plName, setPlName] = useState('');
    const [plHour, setPlHour] = useState('');
    const [plTel, setPlTel] = useState('');
    const [plAddress, setPlAddress] = useState('');
    const [selectPlCity, setSelectPlCity] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pagination, setPagination] = useState();

    useEffect(() => {
        fetchData();
    }, [plId, plName, plHour, plTel, plAddress, currentPage]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:9999/city/list', {
                params: {
                    plId: plId,
                    plName: plName,
                    plHour: plHour,
                    plTel: plTel,
                    plAddress: plAddress,
                    page: currentPage,
                    limit : 5 // 한페이지에 뜨는 데이터 정보 개수
                }
            });
            if (response.status === 200) {
                const { contents, pagination } = response.data;
                setSearchResult(contents);
                setTotalPages(pagination.totalPages);
                setPagination(pagination);
                }
        } catch (error) {
            console.error('Error fetching data:', error);
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
 
    const searchClick = async() => {
        try{
            const response = await axios.get('http://localhost:9999/search/city',{
                params : {
                    plId: plId,
                    plName: plName,
                    plHour: plHour,
                    plTel: plTel,
                    plAddress: plAddress
                }
            });
            if(response.status === 200){
                if(response.data.value){
                    
                }
            }
            console.log(response.data);
        }catch(error){
            console.log(error)
        }
    };

    return (
        <div className={styles.container}>
            <header>
                <Link to="/">놀이</Link>
            </header>
            <div className={styles.main_Image}>
                <h2 className={styles.sub_title}>놀이시설 찾기</h2>
                <img className={styles.logo_white} />
                <div className={styles.search_container}>
                    <PlSelectDong selectPlCity={selectPlCity} setSelectPlCity={setSelectPlCity} />
                    <button className={styles.search_btn} onClick={searchClick}>
                        조회
                    </button>
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
                        {searchResult.map((item, idx) => (
                            <tr key={idx}>
                                <td>
                                    <button className={styles.DeleteBtn}>삭제</button>
                                </td>
                                <td><Link to={`/${item.plId}`} className={styles.plName}>{item.plId}</Link></td>
                                <td><Link to={`/${item.plId}`} className={styles.plName}>{item.plName}</Link></td>
                                <td><Link to={`/${item.plId}`} className={styles.plName}>{item.plHour}</Link></td>
                                <td><Link to={`/${item.plId}`} className={styles.plName}>{item.plTel}</Link></td>
                                <td><Link to={`/${item.plId}`} className={styles.plName}>{item.plAddress}</Link></td>
                            </tr>
                        ))}
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
