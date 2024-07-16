import styles from '../css/memberView.module.css';
import logo_white from '../img/logo_white.png';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import default_img from '../img/default_img.png';
import { useNavigate } from 'react-router-dom';

export default function MemberView() {
  const [memberList, setMemberList] = useState([]);
  const [pagination, setPagination] = useState(null);
  const navigate = useNavigate();
  let txtId = useRef();
  let txtName = useRef();
  let txtRegion = useRef();
  let txtGradeName = useRef();
  let txtPetWith = useRef();
  let txtNick = useRef();
  let txtPetBirth = useRef();
  let txtPetGender = useRef();
  let txtPetSize = useRef();
  let txtPetWeight = useRef();
  let txtPetWalkProfile = useRef();
  let txtPetInfo = useRef();

  useEffect(() => {
    const readData = async () => {
      try {
        const response = await axios.get('http://localhost:9999/member/list');
        console.log(response);
        setMemberList(response.data.members);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error("There was an error fetching the member list!", error);
      }
    }
    readData();
  }, []);

  if (memberList.length === 0) {
    return <div>회원 데이터를 로딩중입니다.</div>
  }

  const handleInputChange = (e, memberId, field) => {
    const updatedList = memberList.map(member => {
      if (member.boardMemberId === memberId) {
        return { ...member, [field]: e.target.value };
      }
      return member;
    });
    setMemberList(updatedList);
  };

  const handlePetWithChange = (e, memberId) => {
    const updatedList = memberList.map(member => {
      if (member.boardMemberId === memberId) {
        return { ...member, boardMemberPetWith: e.target.value === '있음' ? true : false };
      }
      return member;
    });
    setMemberList(updatedList);
  };

  const handleGenderChange = (e, memberId) => {
    const updatedList = memberList.map(member => {
      if (member.boardMemberId === memberId) {
        return { ...member, petGender: e.target.value };
      }
      return member;
    });
    setMemberList(updatedList);
  };

  const handleWalkProfileChange = (e, memberId) => {
    const updatedList = memberList.map(member => {
      if (member.boardMemberId === memberId) {
        return { ...member, petWalkProfile: e.target.value === '예' ? true : false };
      }
      return member;
    });
    setMemberList(updatedList);
  };

  const handlePageChange = (pageNo) => {
    const fetchPageData = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/member/list?page=${pageNo}`);
        setMemberList(response.data.members);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error("There was an error fetching the page data!", error);
      }
    }
    fetchPageData();
  };

  const deleteClick = async (memberId) => {
    try {
      const response = await axios.delete(`http://localhost:9999/member/delete/${memberId}`);
      alert(response.data); // 서버 응답 메시지를 알림으로 표시
      // 상태 업데이트: 삭제된 멤버를 목록에서 제거
      setMemberList(memberList.filter(member => member.boardMemberId !== memberId));
    } catch (error) {
      console.error("There was an error deleting the member!", error);
      alert("회원정보 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <div className={styles.sub_title_container}>
        <h2 className={styles.sub_title}>회원관리</h2>
        <img src={logo_white} alt="logo_white" className={styles.logo_white} />
      </div>
      <div className={styles.searchBox}>
        <select>
          <option>회원ID</option>
          <option>회원이름</option>
          <option>지역</option>
          <option>등급</option>
        </select>
        <input />
        <button>검색</button>
      </div>
      <div className={styles.manage_table_container}>
        <table className={styles.manage_table}>
          <thead>
            <tr>
              <th><input type='checkbox' />프로필</th>
              <th>회원정보</th>
              <th colSpan={3}>반려동물 정보</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {memberList.map((member) => (
              <tr key={member.boardMemberId}>
                <td>
                  <input type='checkbox' />
                  <img src={member.petImagePath || default_img} alt="Pet" className={styles.pet_image} /><br />
                  <span>{member.boardMemberId}</span>
                </td>
                <td>
                  <div className={styles.flex_container}>
                    <span className={styles.label}>이름</span>
                    <input value={member.boardMemberName} ref={txtName} onChange={(e) => handleInputChange(e, member.boardMemberId, 'boardMemberName')} /><br />
                  </div>
                  <div className={styles.flex_container}>
                    <span className={styles.label}>지역</span>
                    <input value={member.boardMemberRegion} ref={txtRegion} onChange={(e) => handleInputChange(e, member.boardMemberId, 'boardMemberRegion')} /><br />
                  </div>
                  <div className={styles.flex_container}>
                    <span className={styles.label}>등급</span>
                    <select className={styles.customSelect} value={member.boardMemberGradeName} ref={txtGradeName} onChange={(e) => handleInputChange(e, member.boardMemberId, 'boardMemberGradeName')}>
                      <option value="애견인">애견인</option>
                      <option value="관리자">관리자</option>
                      <option value="관련기업">관련기업</option>
                    </select><br />
                  </div>
                </td>
                <td>
                  <div className={styles.flex_container}>
                    <span className={styles.label}>유무</span>
                    <select className={styles.customSelect} ref={txtPetWith} value={member.boardMemberPetWith ? '있음' : '없음'} onChange={(e) => handlePetWithChange(e, member.boardMemberId)}>
                      <option value="있음">있음</option>
                      <option value="없음">없음</option>
                    </select><br />
                  </div>
                  <div className={styles.flex_container}>
                    <span className={styles.label}>이름</span>
                    <input value={member.boardMemberNick} ref={txtNick} onChange={(e) => handleInputChange(e, member.boardMemberId, 'boardMemberNick')} /><br />
                  </div>
                  <div className={styles.flex_container}>
                    <span className={styles.label}>출생년월</span>
                    <input value={member.petBirth} ref={txtPetBirth} onChange={(e) => handleInputChange(e, member.boardMemberId, 'petBirth')} />
                  </div>
                </td>
                <td>
                  <div className={styles.flex_container}>
                    <span className={styles.label}>성별</span>
                    <select className={styles.customSelect} value={member.petGender} ref={txtPetGender} onChange={(e) => handleGenderChange(e, member.boardMemberId)}>
                      <option value="F">F</option>
                      <option value="M">M</option>
                    </select><br />
                  </div>
                  <div className={styles.flex_container}>
                    <span className={styles.label}>무게분류</span>
                    <select className={styles.customSelect} value={member.petSize} ref={txtPetSize} onChange={(e) => handleInputChange(e, member.boardMemberId, 'petSize')}>
                      <option value="대형견">대형견</option>
                      <option value="중형견">중형견</option>
                      <option value="소형견">소형견</option>
                    </select><br />
                  </div>
                  <div className={styles.flex_container}>
                    <span className={styles.label}>무게(kg)</span>
                    <input value={member.petWeight} ref={txtPetWeight} onChange={(e) => handleInputChange(e, member.boardMemberId, 'petWeight')} />
                  </div>
                </td>
                <td>
                  <div className={styles.flex_container}>
                    <span className={styles.label}>산책프로필 노출 여부</span>
                    <select className={styles.customSelect} ref={txtPetWalkProfile} value={member.petWalkProfile ? '예' : '아니오'} onChange={(e) => handleWalkProfileChange(e, member.boardMemberId)}>
                      <option value="예">예</option>
                      <option value="아니오">아니오</option>
                    </select><br />
                  </div>
                  <div className={styles.flex_container}>
                    <span className={styles.label}>소개글</span><br />
                    <input value={member.petInfo} className={styles.petInfo} ref={txtPetInfo} onChange={(e) => handleInputChange(e, member.boardMemberId, 'petInfo')} />
                  </div>
                </td>
                <td>
                  <button className={styles.update}>수정</button><br />
                  <button className={styles.delete} onClick={() => deleteClick(member.boardMemberId)}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="6" className={styles.pagination}>
                {console.log('Pagination:', pagination)}
                {pagination && pagination.priviousPageGroup && (
                  <button onClick={() => handlePageChange(pagination.startPageOfPageGroup - 1)}>◀</button>
                )}
                {pagination && Array.from({ length: pagination.endPageOfPageGroup - pagination.startPageOfPageGroup + 1 }, (_, i) => (
                  <button
                    key={i + pagination.startPageOfPageGroup}
                    onClick={() => handlePageChange(i + pagination.startPageOfPageGroup)}
                    className={pagination.currentPage === i + pagination.startPageOfPageGroup ? styles.activePage : ''}
                  >
                    {i + pagination.startPageOfPageGroup}
                  </button>
                ))}
                {pagination && pagination.nextPageGroup && (
                  <button onClick={() => handlePageChange(pagination.endPageOfPageGroup + 1)}>▶</button>
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
