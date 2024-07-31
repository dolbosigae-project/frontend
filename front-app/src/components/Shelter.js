import SubTitleShelter from './SubTitles/SubTitleShelter';
import styles from '../css/shelter.module.css';

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function Shelter() {
  const [shelterList, setShelterList] = useState([]); //빈배열로 초기화
  const [pagination, setPagination] = useState(null);

  useEffect(()=>{
    const readData = async () => {
      try{
        const response = await axios.get('http://localhost:9999/shelter/list');
        console.log('Pagination Data:', response.data.pagination);
        setShelterList(response.data.shelter);
        setPagination(response.data.pagination);
        console.log(response.data);
      } catch(error){
        console.error("보호센터 조회 중 에러발생", error);
      }
    }
    readData();
  }, []);

  return(
    <div>
      <SubTitleShelter />
     {shelterList.length === 0 ? (
        <div>해당 데이터가 없습니다.</div>
      ) : ( 
        <table>
          <thead>
            <tr>
              <th>지역</th>
              <th>이름</th>
              <th>주소</th>
              <th>전화번호</th>
              <th>운영시간</th>
            </tr>
          </thead>
          <tbody>
            {shelterList.map((shelter)=>(
              <tr key={shelter.shelterId}>
                <td>{shelter.shelterRegion}</td>
                <td>{shelter.shelterName}</td>
                <td>{shelter.shelterAddress}</td>
                <td>{shelter.shelterTel}</td>
                <td>{shelter.shelterHour}</td>
              </tr>
            ))}
            
          </tbody>
        </table>
      )}
    </div>
  );
}