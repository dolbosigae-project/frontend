import React, { useRef, useState } from 'react';
import SubTitleMemberRegister from "./SubTitleMemberRegister";
import styles from '../css/memberRegister.module.css';
import logo_small from '../img/logo_small.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function MemberRegister() {
  const [hasPet, setHasPet] = useState(false);
  const [address, setAddress] = useState('');
  const [isIdDuplicate, setIsIdDuplicate] = useState(false);
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const txtId = useRef();
  const formRef = useRef();
  const navigate = useNavigate();

  const handlePetChange = (e) => {
    setHasPet(e.target.value === 'yes');
  };

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function(data) {
        setAddress(data.address);
      }
    }).open();
  };

  const isDuplicate = async () => {
    const idValue = txtId.current.value;
    try {
      const response = await axios.get(`http://localhost:9999/member/duplicate`, {
        params: { idValue: idValue }
      });
      const isDuplicate = response.data > 0;
      setIsIdDuplicate(isDuplicate);
      setIsIdChecked(true);
      setErrorMessage(isDuplicate ? "중복된 아이디입니다." : "아이디를 사용할 수 있습니다.");
    } catch (error) {
      console.error("중복 확인 에러 발생", error);
      setErrorMessage("회원정보 중복 조회 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isIdChecked) {
      alert("아이디 중복 확인 후 회원가입이 가능합니다.");
      return;
    }

    if (isIdDuplicate) {
      alert("중복된 아이디입니다.");
      return;
    }

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post('http://localhost:9999/member/register', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        alert('회원가입 성공');
        navigate('/');
      }
    } catch (error) {
      console.error('회원가입 에러 발생', error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <SubTitleMemberRegister />
      <div className={styles.sub_title_container}>
        <div className={styles.sentence}>
          <img src={logo_small} alt="logo_small" className={styles.logo_small} />
          <p>개인정보입력</p>
        </div>
      </div>
      <div className={styles.form_container}>
        <form ref={formRef} onSubmit={handleSubmit}>
          <table className={styles.form_table}>
            <tbody>
              <tr>
                <td><label>회원이름 *</label></td>
                <td><input type="text" name="name" required /></td>
              </tr>
              <tr>
                <td><label>아이디 *</label></td>
                <td>
                  <input type="text" name="username" ref={txtId} required />
                  <button type="button" onClick={isDuplicate}>중복확인</button>
                  {isIdChecked && <span>{errorMessage}</span>}
                </td>
              </tr>
              <tr>
                <td><label>비밀번호 *</label></td>
                <td><input type="password" name="password" required /></td>
              </tr>
              <tr>
                <td><label>이메일 *</label></td>
                <td><input type="email" name="email" required /></td>
              </tr>
              <tr>
                <td><label>사는지역 *</label></td>
                <td>
                  <input type="text" name="region" value={address} required readOnly />
                  <button type="button" onClick={handleAddressSearch}>주소찾기</button>
                </td>
              </tr>
              <tr>
                <td><label>등급</label></td>
                <td>
                  <span>애견인 *변경 요청은 관리자 문의*</span>
                </td>
              </tr>
              <tr>
                <td><label>반려동물 유무 *</label></td>
                <td>
                  <div>
                    <input
                      type="radio"
                      name="hasPet"
                      value="yes"
                      onChange={handlePetChange}
                    />
                    <label>반려동물을 키우고 있음</label>
                    <input
                      type="radio"
                      name="hasPet"
                      value="no"
                      onChange={handlePetChange}
                    />
                    <label>반려동물을 키우고 있지 않음</label>
                  </div>
                </td>
              </tr>
              {!hasPet && (
                <tr>
                  <td><label>닉네임 *</label></td>
                  <td>
                    <input type="text" name="nickname" required />
                    <p>* 반려동물을 키우지 않을 경우 반려동물 이름 대신 입력하신 닉네임이 사용됩니다.</p>
                  </td>
                </tr>
              )}
              {hasPet && (
                <>
                  <tr>
                    <td><label>반려동물 이름</label></td>
                    <td><input type="text" name="petName" /></td>
                  </tr>
                  <tr>
                    <td><label>반려동물 출생년월</label></td>
                    <td><input type="text" name="petBirth" /></td>
                  </tr>
                  <tr>
                    <td><label>반려동물 성별</label></td>
                    <td><input type="text" name="petGender" /></td>
                  </tr>
                  <tr>
                    <td><label>반려동물 무게</label></td>
                    <td>
                      <select name="petWeight">
                        <option value="소형견">소형견</option>
                        <option value="중형견">중형견</option>
                        <option value="대형견">대형견</option>
                      </select>
                      <input type='number' step="0.1" />
                    </td>
                  </tr>
                  <tr>
                    <td><label>반려동물 소개</label></td>
                    <td><input type="text" name="petIntroduction" /></td>
                  </tr>
                  <tr>
                    <td><label>반려동물 사진</label></td>
                    <td><input type="file" name="petPhoto" /></td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
          <div className={styles.checkbox_container}>
            <input type='checkbox' id='check' required/>
            <label htmlFor='check'>개인정보 제공에 동의합니다.</label>
          </div>
          <div className={styles.form_buttons}>
            <button type="submit">회원가입</button>
            <Link to="/">
              <button type="button">취소</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
