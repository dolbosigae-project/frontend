import React from 'react';
import logo_white from '../img/logo_white.png';
import full_logo_white from '../img/full_logo_white.png';
import styles from '../css/subTitleMemberRegister.module.css';

export default function SubTitleMemberRegister() {
  return (
    <div className={styles.sub_title_container}>
      <div className={styles.sub_title_text}>
        <img src={full_logo_white} alt="full_logo_white" className={styles.full_logo_white} />
        <h2 className={styles.sub_title}>회원가입</h2>
      </div>
      <img src={logo_white} alt="logo_white" className={styles.logo_white} />
    </div>
  );
}