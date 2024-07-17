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
    setHasPet(e.target.value === 'Y');
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

    if (!data.boardMemberRegion) {
      alert("사는지역을 입력해 주세요.");
      return;
    }

    // 디버깅: 수집된 폼 데이터 콘솔에 출력
    console.log(data);

    const jsonData = {
      boardMemberId: data.boardMemberId,
      boardMemberName: data.boardMemberName,
      boardMemberPasswd: data.boardMemberPasswd,
      boardMemberRegion: data.boardMemberRegion,
      boardMemberPetWith: hasPet ? 'T' : 'F',
      petId: '',
      boardMemberNick: hasPet ? data.petName : data.boardMemberNick, // 조건에 따라 설정
      petBirth: data.petBirth,
      petGender: data.petGender,
      petSize: data.petSize,
      petWeight: data.petWeight,
      petWalkProfile: '',
      petImageNo: 0,
      petImagePath: '',
      petInfo: data.petInfo
    };

    // 디버깅: 생성된 JSON 데이터 콘솔에 출력
    console.log(jsonData);

    let response; // 오류 확인을 위해 try 밖에 선언

    try {
      response = await axios.post('http://localhost:9999/member/register', jsonData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        alert('회원가입 성공');
        console.log(response);
        navigate('/');
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.log(response);
      console.error('회원가입 에러 발생', error);
      if (response) {
        console.log('Response data:', response.data);
      }
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
                <td><input type="text" name="boardMemberName" required /></td>
              </tr>
              <tr>
                <td><label>아이디 *</label></td>
                <td>
                  <input type="text" name="boardMemberId" ref={txtId} required />
                  <button type="button" onClick={isDuplicate}>중복확인</button>
                  {isIdChecked && <span>{errorMessage}</span>}
                </td>
              </tr>
              <tr>
                <td><label>비밀번호 *</label></td>
                <td><input type="password" name="boardMemberPasswd" required /></td>
              </tr>
              <tr>
                <td><label>이메일 *</label></td>
                <td><input type="email" name="email" required /></td>
              </tr>
              <tr>
                <td><label>사는지역 *</label></td>
                <td>
                  <input type="text" name="boardMemberRegion" value={address} required readOnly />
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
                      name="boardMemberPetWith"
                      value="Y"
                      onChange={handlePetChange}
                    />
                    <label>반려동물을 키우고 있음</label>
                    <input
                      type="radio"
                      name="boardMemberPetWith"
                      value="N"
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
                    <input type="text" name="boardMemberNick" required />
                    <p>* 반려동물을 키우지 않을 경우 반려동물 이름 대신 입력하신 닉네임이 사용됩니다.</p>
                  </td>
                </tr>
              )}
              {hasPet && (
                <>
                  <tr>
                    <td><label>반려동물 이름</label></td>
                    <td><input type="text" name="petName" required /></td>
                  </tr>
                  <tr>
                    <td><label>반려동물 출생년월</label></td>
                    <td><input type="text" name="petBirth" placeholder='0000-00'/></td>
                  </tr>
                  <tr>
                    <td><label>반려동물 성별</label></td>
                    <td><input type="text" name="petGender" placeholder='M/F'/></td>
                  </tr>
                  <tr>
                    <td><label>반려동물 무게</label></td>
                    <td>
                      <select name="petSize">
                        <option value="소형견">소형견</option>
                        <option value="중형견">중형견</option>
                        <option value="대형견">대형견</option>
                      </select>
                      <input type='number' step="0.1" name="petWeight" />
                    </td>
                  </tr>
                  <tr>
                    <td><label>반려동물 소개</label></td>
                    <td><input type="text" name="petInfo" /></td>
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
