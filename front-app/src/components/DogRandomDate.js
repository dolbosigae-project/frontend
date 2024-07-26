import SubTitleDogRandomDate from "./SubTitles/SubTitleDogRandomDate";
import styles from '../css/dogRandomDate.module.css';
import logo_small from '../img/logo_small.png';
import { useRef } from "react";
import axios from 'axios';

export default function DogRandomDate() {
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());

    const jsonData = {
      petSize: data.petSize,
      petBirth: data.petBirth,
      petGender: data.petGender
    };

    console.log("jsonData : ", jsonData);

    try{
      const response = await axios.get('http://localhost:9999/dog/random/date', jsonData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

    } catch(error){
      console.error('댕개팅 에러 발생', error);
      alert('정보 조회 중 오류가 발생했습니다.');
    }
  }

  return(
    <div className={styles.container}>
      <SubTitleDogRandomDate />
      <div className={styles.sentence}>
        <img src={logo_small} alt="logo_small" className={styles.logo_small} />
        <div className={styles.sentenceSub}>
          <span style={{fontSize : '18px'}}>견주님의 강아지와 잘 어울릴 댕친구를 찾아보세요🐶</span>
          <span style={{fontSize : '14px', color : '#929292'}}>* 산책 프로필 노출을 선택한 강아지만 보실 수 있습니다.</span>
        </div>
      </div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <table>
          <tr>
            <th>크기</th>
            <td>
            <select name="petSize">
              <option value="소형견">소형견</option>
              <option value="중형견">중형견</option>
              <option value="대형견">대형견</option>
            </select>
            </td>
            <th>나이</th>
            <td>
            <select name="petBirth">
              <option value="1살이하">1살이하</option>
              <option value="2~4살">2~4살</option>
              <option value="5~7살">5~7살</option>
              <option value="8~10살">8~10살</option>
              <option value="11살이상">11살이상</option>
            </select>
            </td>
            <th>성별</th>
            <td>
            <select name="petGender">
              <option value="M">남아</option>
              <option value="F">여아</option>
              <option value="G">중성화</option>
            </select>
            </td>
            <td>
              <button type="submit">강아지 찾기</button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
}