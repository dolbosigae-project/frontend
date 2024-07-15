import styles from '../css/memberView.module.css';
import logo_white from '../img/logo_white.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import default_img from '../img/default_img.png';

export default function MemberView() {
  const [memberList, setMemberList] = useState([]);
  const [pagination, setPagination] = useState(null);

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
        <input/>
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
                    <span className={styles.label}>이름</span> <input value={member.boardMemberName} readOnly /><br />
                  </div>
                  <div className={styles.flex_container}>
                    <span className={styles.label}>지역</span> <input value={member.boardMemberRegion} readOnly /><br />
                  </div>
                  <div className={styles.flex_container}>
                    <span className={styles.label}>등급</span> <input value={member.boardMemberGradeName} readOnly />
                  </div>
                </td>
                <td>
                  <div className={styles.flex_container}>
                    <span className={styles.label}>유무</span> 
                    <select className={styles.customSelect} value={member.boardMemberPetWith ? '있음' : '없음'} onChange={(e) => handlePetWithChange(e, member.boardMemberId)}>
                      <option value="있음">있음</option>
                      <option value="없음">없음</option>
                    </select><br />
                  </div>
                  <div className={styles.flex_container}>
                    <span className={styles.label}>이름</span> <input value={member.boardMemberNick} readOnly /><br />
                  </div>
                  <div className={styles.flex_container}>
                    <span className={styles.label}>출생년월</span> <input value={member.petBirth} readOnly />
                  </div>
                </td>
                <td>
                  <div className={styles.flex_container}>
                    <span className={styles.label}>성별</span> 
                    <select className={styles.customSelect} value={member.petGender} onChange={(e) => handleGenderChange(e, member.boardMemberId)}>
                      <option value="F">F</option>
                      <option value="M">M</option>
                    </select><br />
                  </div>
                  <div className={styles.flex_container}>
                    <span className={styles.label}>무게분류</span> <input value={member.petSize} readOnly /><br />
                  </div>
                  <div className={styles.flex_container}>
                    <span className={styles.label}>무게(kg)</span> <input value={member.petWeight} readOnly />
                  </div>
                </td>
                <td>
                  <div className={styles.flex_container}>
                    <span className={styles.label}>산책프로필 노출 여부</span> 
                    <select className={styles.customSelect} value={member.petWalkProfile ? '예' : '아니오'} onChange={(e) => handleWalkProfileChange(e, member.boardMemberId)}>
                      <option value="예">예</option>
                      <option value="아니오">아니오</option>
                    </select><br />
                  </div>
                  <div className={styles.flex_container}>
                    <span className={styles.label}>소개글</span><br />
                    <input value={member.petInfo} className={styles.petInfo} readOnly />
                  </div>
                </td>
                <td>
                  <button className={styles.update}>수정</button><br />
                  <button className={styles.delete}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="6" className={styles.pagination}>
                {pagination && pagination.isPriviousPageGroup && (
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
                {pagination && pagination.isNextPageGroup && (
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
