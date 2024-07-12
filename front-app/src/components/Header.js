import { Link } from "react-router-dom";
import styles from '../css/header.module.css';
import logo from '../img/logo.png'; // 로고 경로 설정

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <div className={styles.auth}>
          <ul>
            <li>
              <Link to="/register" className={styles.authItem}>회원가입</Link>
            </li>
            <li>
              <Link to="/login" className={styles.authItem}>로그인</Link>
            </li>
          </ul>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <Link to="/">
                <img src={logo} alt="Logo" className={styles.logo} />
              </Link>
            </li>
            <li className={styles.navItem}><Link to="/">동물 의료</Link></li>
            <li className={styles.navItem}><Link to="/">놀이 · 편의</Link></li>
            <li className={styles.navItem}><Link to="/">자랑 게시판</Link></li>
            <li className={styles.navItem}><Link to="/">산책 친구 찾기</Link></li>
            <li className={styles.navItem}><Link to="/">동물보호</Link></li>
            <li className={styles.navItem}><Link to="/">관리자문의</Link></li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
