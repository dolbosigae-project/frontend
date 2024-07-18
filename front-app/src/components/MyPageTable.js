import styles from '../css/myPageTable.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function MyPageTable() {
  const [memberList, setMemberList] = useState([]); // 빈 배열로 초기화
  const userId = localStorage.getItem('userId'); // 로컬 스토리지에서 사용자 ID를 가져옴

  useEffect(() => {
    const readData = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:9999/member/search/${userId}`);
          setMemberList(response.data.members);
        } catch (error) {
          console.error('정보를 불러오지 못했습니다.', error);
        }
      } else {
        console.error('사용자 ID를 찾을 수 없습니다.');
      }
    };
    readData();
  }, [userId]);

  return (
    <div>
      {memberList.length === 0 ? (
        <div>데이터가 로딩 중입니다...</div>
      ) : (
        <table>
          <tbody>
            <tr>
              <td>회원이름</td>
              <td>
                <input type="text" value={memberList[0].name} readOnly />
              </td>
            </tr>
            {/* 필요한 다른 사용자 정보도 추가할 수 있습니다. */}
          </tbody>
        </table>
      )}
    </div>
  );
}
