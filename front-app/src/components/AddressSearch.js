import React, { useState } from 'react';
import './style.css';

const AddressSearch = ({ onAddressSearch }) => {
  const [postcode, setPostcode] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [extraAddress, setExtraAddress] = useState('');

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let addr = '';
        let extraAddr = '';

        if (data.userSelectedType === 'R') {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }

        if (data.userSelectedType === 'R') {
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }

          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
          }

          if (extraAddr !== '') {
            extraAddr = ' (' + extraAddr + ')';
          }
        }

        setPostcode(data.zonecode);
        setAddress(addr);
        setExtraAddress(extraAddr);

        // Callback to parent component with the searched address
        onAddressSearch(addr);
      }
    }).open();
  };

  return (
    <div className="address-search">
      <input type="text" id="sample6_postcode" value={postcode} placeholder="우편번호" readOnly />
      <input type="button" onClick={handleAddressSearch} value="우편번호 찾기" /><br />
      <input type="text" id="sample6_address" value={address} placeholder="주소" readOnly /><br />
      <input type="text" id="sample6_extraAddress" value={extraAddress} placeholder="상세주소" readOnly />
      <input type="text" id="sample6_detailAddress" value={detailAddress} placeholder="상세주소를 입력하세요" onChange={(e) => setDetailAddress(e.target.value)} />
    </div>
  );
};

export default AddressSearch;
