import SubTitleAdminContact from './SubTitles/SubTitleAdminContact';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function AdminContactNormalTableDetail() {
  const { adminNo } = useParams();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/admin/contact/detail/${adminNo}`);
        console.log(response);
        setDetail(response.data);
      } catch (error) {
        console.error("There was an error fetching the detail!", error);
      }
    };
    fetchDetail();
  }, [adminNo]);

  if (!detail) return <div>페이지 로드 중입니다...</div>;

  return(
    <div>
      <SubTitleAdminContact/>
      <h2>{detail.adminTitle}</h2>
    </div>
  );
}