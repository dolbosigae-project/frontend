import React, { useState } from 'react';

const ShelterFilter = ({ onFilterChange }) => {
    const [region, setRegion] = useState('선택');
    const [keyword, setKeyword] = useState('');

    const handleRegionChange = (event) => {
        setRegion(event.target.value);
        onFilterChange(event.target.value, keyword);
    };

    const handleKeywordChange = (event) => {
        setKeyword(event.target.value);
        onFilterChange(region, event.target.value);
    };

    return (
        <div className="filter">
            <select value={region} onChange={handleRegionChange}>
                <option>선택</option>
                {['가평군', '고양시', '과천시', '광명시', '광주시', '구리시', '남양주시', '동두천시', '부천시', '성남시', '수원시', '시흥시', 
                '안산시', '양주시', '양평군', '연천군', '용인시', '의왕시', '의정부시', '평택시', '하남시', '화성시'].map(region => (
                    <option key={region} value={region}>{region}</option>
                ))}
            </select>
            <input
                type="text"
                value={keyword}
                onChange={handleKeywordChange}
                placeholder="센터명을 입력하세요"
            />
            <button onClick={() => onFilterChange(region, keyword)}>조회</button>
        </div>
    );
};

export default ShelterFilter;
