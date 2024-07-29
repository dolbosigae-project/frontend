import { useEffect, useState } from 'react';
import styles from './css/semi.css';
import axios from 'axios';

const Semifinals = () => {
    const [result, setResult] = useState([]);
    const [displays, setDisplays] = useState([]);

    useEffect(() => {
        const RandomDog = async () => {
            try {
                const response = await axios.get(`http://localhost:9999/RandomDog`);
                setResult(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        RandomDog();
    }, []);



    return (
        <div className={styles.semi_main_container}>
            <div className={styles.semi_info}>
                <p>마음에 드는 강아지를 선택해주세요!</p>
            </div>
            <div className={styles.semi_title_container}>
                <h2 className={styles.semi_title}>개상형 월드컵 4강 { }</h2>
            </div>
            {displays.map(dog => {
                return (
                    <div>
                        <div className={styles.semi_choese_image}>
                            <img className={styles.semi_choese_img}>{dog.img}</img>
                        </div>
                        <div className={styles.semi_choese_text}>
                            <p className={styles.semi_choese_infoText}>{dog.text}</p>
                        </div>
                        <div className={styles.semi_choese_btn}>
                            <button className={styles.semi_choese_button}>{dog.button}</button>
                        </div>
                    </div>
                );
            })}
        </div >
    )
}
export default Semifinals;