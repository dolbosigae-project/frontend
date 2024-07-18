import styles from '../css/myPageTable.module.css';
import { useEffect, useState } from 'react';

export default function MyPageTable({ member, onMemberChange }) {
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (address) {
      onMemberChange({
        ...member,
        boardMemberRegion: address
      });
    }
  }, [address]);

  const handleInputChange = (e, field) => {
    onMemberChange({
      ...member,
      [field]: e.target.value || '' // null일 경우 빈 문자열로 설정
    });
  };

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function(data) {
        setAddress(data.address);
      }
    }).open();
  };

  return (
    <div className={styles.tableContainer}>
      {!member ? (
        <div>데이터가 로딩 중입니다...</div>
      ) : (
        <table>
          <tbody>
            <tr>
              <td>회원이름</td>
              <td>
                <input 
                  type="text" 
                  value={member.boardMemberName || ''} 
                  onChange={(e) => handleInputChange(e, 'boardMemberName')}
                />
              </td>
            </tr>
            <tr>
              <td>아이디</td>
              <td>
                <input 
                  type="text" 
                  value={member.boardMemberId || ''} 
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <td>비밀번호</td>
              <td>
                <input 
                  type="password" 
                  value={member.boardMemberPasswd || ''} 
                  onChange={(e) => handleInputChange(e, 'boardMemberPasswd')}
                />
              </td>
            </tr>
            <tr>
              <td>사는 지역</td>
              <td>
                <input 
                  type="text" 
                  value={member.boardMemberRegion || ''} 
                  onChange={(e) => handleInputChange(e, 'boardMemberRegion')}
                />
                <button type="button" onClick={handleAddressSearch}>주소찾기</button>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
