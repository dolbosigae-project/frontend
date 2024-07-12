import react, { useState } from 'react';
import styles from '../../css/poci_css/pl.module.css';
import PoselectDong from './PoSelectDong';
import axios from 'axios';
export default function PL() {
   const [plName, setPlName] = useState();
   const [plHour, setPlHour] = useState();
   const [plTel, setPlTel] = useState();
   const [plAddress, setPlAddress] = useState();
   const [selectAddress, setSelectAddress] = useState();
   
   const searchClick = async() => {
    try{
        const response = await axios.post("https://nam3324.synology.me:32800/search/city",{
            selectAddress : selectAddress
        });
        console.log(response.data);
    }catch(error){
        console.log(error);
    }
}

    return(
        <div>
            <header>
                해더 영역 route로 받아옴
            </header>
            <div className={styles.main_Image}>
                <image className={styles.main_img}/>
            </div>
            <div className={styles.search_container}>
    <PoselectDong selectCity={selectCity} setSelectAddress={setSelectAddress}/>
                <button className={styles.search_btn} onClick={searchClick}>조회</button>
            </div>
            <div className={styles.info_container}>
                <table>
                    <thead>
                        <tr>
                            <th>공원명</th>
                            <th>출입 허용 시간</th>
                            <th>전화번호</th>
                            <th>도로명 주소</th>
                        </tr>
                    </thead>
                    <tbody>
                        여기는 반복문으로 5번
                        <tr>
                            <button className={styles.delete_btn}>삭제</button>
                            <td>
                                <input
                                    type='text'
                                    className={styles.input}
                                    onChange={(e) => setPlName(e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type='text'
                                    className={styles.input}
                                    onChange={(e) => setPlHour(e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type='text'
                                    className={styles.input}
                                    onChange={(e) => setPlTel(e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type='text'
                                    className={styles.input}
                                    onChange={(e) => setPlAddress(e.target.value)}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>

            </div>
            <footer className={styles.footer}>
                하단바
            </footer>
        </div>
    )
}