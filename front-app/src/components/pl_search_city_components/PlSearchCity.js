import axios from "axios";
import { useState } from "react"
import styles from "../../css/poci_css/pl.module.css";
import { Link } from "react-router-dom";

function PlSelectCity() {
    const [plText, setPlText] = useState('');
    const [result, setResult] = useState('');
    
    const searchClick = async() => {
            try{
            const response = await axios.get("http://localhost:9999/search/city?plText=${plText}",{
                params:{
                    plText : plText
                }
            });
            setResult(response.data.contents);
            return(
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
                        {result.map((city, index) => (
                        <tr key={index}>
                            <td>
                                <button className={styles.DeleteBtn}>삭제</button>
                            </td>
                            <td><Link to={`${city.plId}`} className={styles.plName}>{city.plId}</Link></td>
                                <td><Link to={`${city.plId}`} className={styles.plName}>{city.plName}</Link></td>
                                <td><Link to={`${city.plId}`} className={styles.plName}>{city.plHour}</Link></td>
                                <td><Link to={`${city.plId}`} className={styles.plName}>{city.plTel}</Link></td>
                                <td><Link to={`${city.plId}`} className={styles.plName}>{city.plAddress}</Link></td>
                        </tr>
                        ))}
                        
                    </tbody>
                </table>
            )
        }catch (error){
            console.log(error);
        }
    };
    
    return(
        <div>
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
    )
}
export default PlSelectCity;