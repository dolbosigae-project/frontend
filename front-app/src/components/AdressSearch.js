import React from 'react';

const AddressSearch = ({ setAddress }) => {
  const searchAddress = () => {
    new window.daum.Postcode({
      oncomplete: function(data) {
        const addr = data.address;
        document.getElementById("sample5_address").value = addr;
        setAddress(addr);
      }
    }).open();
  };

  return (
    <div className="search">
      <input type="text" id="sample5_address" placeholder="주소" />
      <input type="button" onClick={searchAddress} value="주소 검색" />
    </div>
  );
};

export default AddressSearch;
