import { Link } from 'react-router-dom';
import styles from '../css/myPageButton.module.css';

export default function MyPageButton({ onUpdateClick }) {

  return (
    <div className={styles.Container}>
      <button className={styles.Update} onClick={onUpdateClick}>수정</button>
      <Link to="/">
        <button className={styles.cancel}>취소</button>
      </Link>
    </div>
  );
}
