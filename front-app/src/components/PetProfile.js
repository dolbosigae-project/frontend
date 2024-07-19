import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';


export default function PetProfile() {

     const [nickname, setNickname] = useState('');
     const [profile, setProfile] = useState({});
     const [id, setId] = useState('');
   
     //현재 로그인한 회원의 id 
     
     
     /* 프로필 정보 가져오는데, 사람아니고 동물 */
     useEffect(() => {
       if (setId) {
         loadPetProfile(id);
       }
     }, [setId]);
     
     const loadPetProfile = (id) => {
       fetch(`/api/users/${id}`)
         .then(response => response.json())
         .then(data => {
           // 프로필 정보를 상태에 저장
           setProfile(data);
         })
         .catch(error => console.error('프로필 에러 뜸:', error));
     };
   
   
     return (
       <div>
           <div className='chatcontainer'>
               <table>
                 <tbody>
                 <tr>
                   <td>나이</td>
                   <td>성별</td>
                   <td>크기</td> 
                   <td>몸무게</td>
                   <td>소개</td>
                 </tr>
                 <tr>
                   <td>{profile.petBirth}</td>
                   <td>{profile.petGender}</td>
                   <td>{profile.petSize}</td>
                   <td>{profile.petWeight}</td>
                   <td>{profile.petWalkProfile}</td>
                 </tr>
                 </tbody>
               </table>
           </div>
       </div>
     );
}