import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './css/winnerPage.module.css';

//우승 횟수 추가시키는 함수
const WinnerPage = () => {
    const { dogId } = useParams();
    const [winnerDog, setWinnerDog] = useState(null);
    const [allRanking, setAllRanking] = useState([]);
    useEffect(() => {
        const fetchWinDogCount = async () => {
            try {
                const response = await axios.post(`http://localhost:9999/winCount?dogId=${dogId}`);
                console.log("우승횟수 백엔드로 전송:", response.data);

            } catch (error) {
                console.error('Error sending win count:', error);
            }
        }
        fetchWinDogCount();
    }, [dogId]);

    //우승한 강아지 사진 가져오는 함수
    useEffect(() => {
        const fetchWinnerDog = async () => {
            try {
                console.log(`${dogId}`)
                const response = await axios.get('http://localhost:9999/winnerDog', {
                    params: {
                        dogId: dogId
                    }
                });
                console.log(response.data);
                setWinnerDog(response.data);
            } catch (error) {
                console.error('Error fetching winner dog:', error);
            }
        };
        fetchWinnerDog();
    }, [dogId]);

    //전체 랭킹 가져오는 함수
    useEffect(() => {
        const AllRanking = async () => {
            try {
                const response = await axios.get('http://localhost:9999/AllRanking');
                setAllRanking(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error)
            }
        }
        AllRanking();
    }, []);

    if (!winnerDog) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.winner_container}>
            <div>
                <div className={styles.winner_dog_container}>
                    <h2 className={styles.dwcp_title}>개상형 월드컵 우승</h2>
                    <img className={styles.winner_img} src={winnerDog.dogImg} alt={`dog-${winnerDog.dogId}`} />
                    <div className={styles.winner_info}>
                        <p>이름 : {winnerDog.dogTypeName}</p>
                        <p>내용 : {winnerDog.dogTypeInfo}</p>
                        <p>우승 횟수 : {winnerDog.dogRanking + 1}</p>
                    </div>
                </div>
            </div>
            <div className={styles.winner_community_container}>
                <h2>Top 10 랭킹</h2>
                <div className={styles.ranking_topTen}>
                    {allRanking.map((rank, index) => (
                        <div key={index} className={styles.ranking_item}>
                            <img className={styles.ranking_img} src={rank.dogImg} alt={`dog-${rank.dogId}`} />
                            <div className={styles.ranking_info}>
                                <p>{rank.dogTypeName}</p>
                                <p>{rank.dogTypeInfo}</p>
                                <p>{rank.dogRanking}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div>

                </div>
                <div></div>
            </div>
        </div>
    );
};

export default WinnerPage;
