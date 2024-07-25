import React from 'react';
import logo_white from '../../img/logo_white.png';
import styles from '../../css/subtitles/subTitleWhite.module.css';

const SubTitleHospital = () => {
  return (
    <div className={styles.sub_title_container}>
      <h2 className={styles.sub_title}>동물병원 찾기</h2>
      <img src={logo_white} alt="logo_white" className={styles.logo_white} />
    </div>
  );
};

export default SubTitleHospital;