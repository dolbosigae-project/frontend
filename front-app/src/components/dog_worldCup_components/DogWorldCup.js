import { Link } from "react-router-dom";
import { useState } from "react";
import SubTitleDogWorldCup from "../SubTitles/SubTitleDogWorldCup";
import styles from './css/dogWorldCup.module.css';

const DogWorldCup = () => {
    const [hiddenText, setHiddenText] = useState('');

    const dwcExplanation = (round) => {
        let text;
        switch (round) {
            case 4:
                text = "등록된 강아지 중 4마리가 대결합니다.";
                break;
            case 16:
                text = "등록된 강아지 중 16마리가 대결합니다.";
                break;
            case 32:
                text = "등록된 강아지 중 32마리가 대결합니다.";
                break;
            case 64:
                text = "등록된 강아지 중 64마리가 대결합니다.";
                break;
            default:
                text = "";
        }
        setHiddenText(text);
    }

    const dwcMouseLeave = () => {
        setHiddenText('');
    }

    return (
        <div className={styles.dwc_main_container}>
            <SubTitleDogWorldCup />
            <div className={styles.dwc_explanation_container}>
                <p className={styles.dwc_explanation}>총 라운드를 선택해주세요!!</p>
            </div>
            <form >
                <div className={styles.dwc_option_container}>
                    <div className={styles.dwc_link_container}>
                        <Link to='/4' className={styles.dwc_link}
                            onMouseEnter={() => dwcExplanation(4)}
                            onMouseLeave={dwcMouseLeave}
                        >
                            <label className={styles.dwc_label}>4강</label>
                        </Link>
                        <Link to='/16' className={styles.dwc_link}
                            onMouseEnter={() => dwcExplanation(16)}
                            onMouseLeave={dwcMouseLeave}
                        >
                            <label className={styles.dwc_label}>16강</label>
                        </Link>
                        <Link to='/32' className={styles.dwc_link}
                            onMouseEnter={() => dwcExplanation(32)}
                            onMouseLeave={dwcMouseLeave}
                        >
                            <label className={styles.dwc_label}>32강</label>
                        </Link>
                        <Link to='/64' className={styles.dwc_link}
                            onMouseEnter={() => dwcExplanation(64)}
                            onMouseLeave={dwcMouseLeave}
                        >
                            <label className={styles.dwc_label}>64강</label>
                        </Link>
                    </div>
                    <div className={styles.dwc_info}>
                        <span className={styles.dwc_span}>{hiddenText}</span>
                    </div>
                </div>
            </form>
            <hr className={styles.dwc_hr} />
        </div>
    )
}
export default DogWorldCup;