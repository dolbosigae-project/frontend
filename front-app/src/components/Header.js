import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";
import styles from '../css/header.module.css';
import logo from '../img/logo.png';
import login from '../img/login.png';
import register from '../img/register.png';
import memberView from '../img/memberView.png';
import my_page from '../img/my_page.png';
import { useState, useEffect } from 'react';

export default function Header({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        console.log('저장된 사용자 정보:', parsedUser);
        setUser(parsedUser);
      }
    } else {
      setUser(null);
    }
  }, [isLoggedIn]);

  const handleLogout = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:9999/logout', { withCredentials: true });
      if (response.data === 'success') {
        localStorage.removeItem('user'); // 로컬 스토리지에서 사용자 정보 삭제
        onLogout(); // 상위 컴포넌트의 상태 업데이트
        navigate('/'); // 홈 페이지로 이동
      } else {
        alert('로그아웃에 실패하였습니다.');
      }
    } catch (error) {
      alert('로그아웃에 실패하였습니다.');
      console.error('Logout failed:', error);
    }
  }

  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <div className={styles.auth}>
          <ul>
            {isLoggedIn ? (
              <>
                <li className={styles.top_button}>
                  <Link to="/member/mypage" className={styles.authItem}>
                    <img src={my_page} alt="my_page" className={styles.my_page} />마이페이지
                  </Link>
                </li>
                {user && user.boardMemberGradeNo === 0 && (
                  <li className={styles.top_button}>
                    <Link to="/member/view" className={styles.authItem}>
                      <img src={memberView} alt="MemberView" className={styles.memberView} />회원관리
                    </Link>
                  </li>)}
                <li>
                  <button onClick={handleLogout} className={styles.authItem}>로그아웃</button>
                </li>
              </>
            ) : (
              <>
                <li className={styles.top_button}>
                  <Link to="/login" className={styles.authItem}>
                    <img src={login} alt="Login" className={styles.login} />로그인
                  </Link>
                </li>
                <li className={styles.top_button}>
                  <Link to="/member/register" className={styles.authItem}>
                    <img src={register} alt="Register" className={styles.register} />회원가입
                  </Link>
                </li>
              </>
            )}
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