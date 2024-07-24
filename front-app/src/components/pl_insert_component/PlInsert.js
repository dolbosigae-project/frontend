import axios from 'axios';
import styles from './css/plInsert.module.css';

const PlInsert = () => {
    const plInsertClick = async () => {
        try {
            const response = await axios.post('http://localhost:9999/city/insert');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.pl_update_contanier}>
            <h2>놀이시설 등록</h2>
            <table className={styles.pl_update_table}>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>놀이시설 이름</th>
                        <th>영업 시간</th>
                        <th>전화번호</th>
                        <th>도로명 주소</th>
                        <th>제한조건</th>
                        <th>가격</th>
                        <th>면적</th>
                        <th>휴일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{ }</td>
                        <td><input type='text' placeholder='놀이시설 이름을 입력해주세요.' onChange={(e) => set} /></td>
                    </tr>
                </tbody>
            </table>
            <div>
                <button className={styles.pl_insertBtn} onClick={plInsertClick}>등록</button>
            </div>
        </div>
    )
};
export default PlInsert;