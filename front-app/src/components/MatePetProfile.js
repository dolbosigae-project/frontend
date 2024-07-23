import React, { useEffect, useState } from 'react';


export default function PetProfile() {

     const [nickname, setNickname] = useState('');
     const [profile, setProfile] = useState({});
     const [id, setId] = useState('');
   
     
     
     /* 프로필 정보 가져오는데, 사람아니고 동물 */
     
   
   
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