import { useRef, useState } from "react";
import SubTitleLoginPasswd from "./SubTitleLoginPasswd";
import axios from 'axios';
import styles from '../css/loginPasswd.module.css';

export default function LoginPasswd() {
  const txtId = useRef();
  const newPassword = useRef();
  const confirmPassword = useRef();
  const [isIdDuplicate, setIsIdDuplicate] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isDuplicate = async () => {
    const idValue = txtId.current.value;
    try {
      const response = await axios.get(`http://localhost:9999/member/duplicate`, {
        params: { idValue: idValue }
      });
      console.log(response.data);
      if (response.data === 0) {
        alert('해당 아이디가 없습니다.\n회원가입 페이지로 이동합니다.');
        window.location.href = '/member/register';
      } else {
        console.log('아이디가 존재합니다.');
        setIsIdDuplicate(true);
      }
    } catch (error) {
      console.error("중복 확인 에러 발생", error);
      setErrorMessage("회원정보 중복 조회 중 오류가 발생했습니다.");
    }
  };

  const handleChangePassword = async () => {
    const newPass = newPassword.current.value;
    const confirmPass = confirmPassword.current.value;

    if (newPass !== confirmPass) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const idValue = txtId.current.value;
      const response = await axios.post(`http://localhost:9999/find/passwd`, {
        id: idValue,
        passwd: newPass
      });

      if (response.status === 200) {
        alert("비밀번호가 성공적으로 변경되었습니다.\n로그인 페이지로 이동합니다.");
        window.location.href = '/login';
      }
    } catch (error) {
      console.error("비밀번호 변경 에러 발생", error);
      alert("비밀번호 변경 중 오류가 발생했습니다.");
    }
  };

  return(
    <div>
      <SubTitleLoginPasswd />
      <div className={styles.container}>
        <p>아이디를 입력해주세요</p>
        <input type="text" name="boardMemberId" ref={txtId} required />
        <button type="button" onClick={isDuplicate}>아이디 확인</button>
        {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
        {isIdDuplicate && (
          <>
            <br/>
            <p>새로 설정할 비밀번호를 입력해주세요</p>
            <input type="password" name="newPassword" ref={newPassword} required />
            <p>비밀번호를 한번 더 입력해주세요</p>
            <input type="password" name="confirmPassword" ref={confirmPassword} required /><br/>
            <button type="button" onClick={handleChangePassword}>비밀번호 변경하기</button>
          </>
        )}
      </div>
    </div>
  );
}
