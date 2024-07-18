import React from "react";
import SubTitleLogin from "./SubTitleLogin";
import LoginForm from "./LoginForm";
import KakaoLogin from "./KakaoLogin";
import styles from '../css/login.module.css';

export default function Login({ onLoginSuccess }) {
  return (
    <div>
      <SubTitleLogin />
      <div className={styles.sub_container}>
        <LoginForm onLoginSuccess={onLoginSuccess} />
        <div className={styles.vertical_line}></div>
        <KakaoLogin onLoginSuccess={onLoginSuccess} />
      </div>
    </div>
  );
}
