
// components/Login.js

import React from 'react';

const Login = ({ onLoginSuccess }) => {
  // Handler function for login button click
  const handleLogin = () => {
    // Simulating a successful login
    // You would typically do an API call here to authenticate the user
    // and then call onLoginSuccess if login is successful
    console.log('Login button clicked');

    // Simulated API call success
    setTimeout(() => {
      // Call the onLoginSuccess function provided via props
      onLoginSuccess();
    }, 1000); // Simulating delay for API call
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />

        <button type="button" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;
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
