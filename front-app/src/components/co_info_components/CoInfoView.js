import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './css/CoInfoView.module.css';
import SubTitleCO from '../SubTitles/SubTitleCO';

const CoInfoView = () => {
    const { coId } = useParams();
    const [convenInfo, setConvenInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchConvenInfo = async () => {
            try {
                const response = await fetch(`http://localhost:9999/conven/info?coId=${coId}`);
                if (!response.ok) {
                    throw new Error('서버 에러');
                }
                const data = await response.json();
                setConvenInfo(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
                console.error('데이터를 가져오는데 실패하였습니다.', error);
            }
        };
        fetchConvenInfo();
    }, [coId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className={styles.co_main_container}>
            <div className={styles.co_SubTitlePL_container}>
                <SubTitleCO />
            </div>
            <img className={styles.co_info_Img} src={`/path/to/images/${convenInfo.IMAGE_NM}`} alt="Convenience Info" />
            <table className={styles.co_table}>
                <tbody>
                    <tr className={styles.co_Info_tr}>
                        <td className={styles.co_name_td}><p className={styles.co_p_Tag}>업종명</p></td>
                        <td className={styles.co_data_td}>{convenInfo.coName}</td>
                        <td className={styles.co_name_td}><p className={styles.co_p_Tag}>분류</p></td>
                        <td className={styles.co_data_td}>{convenInfo.coDistinction}</td>
                    </tr>
                    <tr className={styles.co_Info_tr}>
                        <td className={styles.co_name_td}><p className={styles.co_p_Tag}>전화번호</p></td>
                        <td className={styles.co_data_td}>{convenInfo.coTel}</td>
                        <td className={styles.co_name_td}><p className={styles.co_p_Tag}>출입여부일</p></td>
                        <td className={styles.co_data_td}>{convenInfo.coDay}</td>
                    </tr>
                    <tr className={styles.co_Info_tr}>
                        <td className={styles.co_name_td}><p className={styles.co_p_Tag}>토요일 운영 시간</p></td>
                        <td className={styles.co_data_td}>{convenInfo.coSatHour}</td>
                        <td className={styles.co_name_td}><p className={styles.co_p_Tag}>일요일 운영 시간</p></td>
                        <td className={styles.co_data_td}>{convenInfo.coSunHour}</td>
                    </tr>
                    <tr className={styles.co_Info_tr}>
                        <td className={styles.co_name_td}><p className={styles.co_p_Tag}>운영 시간</p></td>
                        <td className={styles.co_data_td}>{convenInfo.coHour}</td>
                        <td className={styles.co_name_td}><p className={styles.co_p_Tag}>사이트 바로가기</p></td>
                        <td className={styles.co_data_td}><a href={convenInfo.coWebsite}>바로가기</a></td>
                    </tr>
                    <tr className={styles.co_Address_tr}>
                        <td className={styles.co_name_td}><p className={styles.co_p_Tag}>주소</p></td>
                        <td className={styles.co_data_td} colSpan="3">{convenInfo.coAddress}</td>
                    </tr>
                </tbody>
            </table>
            <div className={styles.co_list_link_container}>
                <Link to="/co" className={styles.co_list_Link}>목록</Link>
            </div>
        </div>
    );
};

export default CoInfoView;