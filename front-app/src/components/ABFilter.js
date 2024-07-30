import React, { useState } from 'react';

const ABFilter = ({ onFilterChange }) => {
    const [region, setRegion] = useState('');
    const [centerName, setCenterName] = useState('');
    const [breed, setBreed] = useState('');

    const handleRegionChange = (event) => {
        setRegion(event.target.value);
    };

    const handleCenterNameChange = (event) => {
        setCenterName(event.target.value);
    };

    const handleBreedChange = (event) => {
        setBreed(event.target.value);
    };

    const handleApplyFilter = () => {
        // 필터가 비어있을 경우 해당 필드는 제외합니다.
        const newFilter = {
            region: region || undefined,
            centerName: centerName || undefined,
            breed: breed || undefined,
        };

        // onFilterChange 콜백을 호출하여 필터 변경 사항을 상위 컴포넌트에 전달합니다.
        onFilterChange(newFilter);
    };

    return (
        <div className="filter">
            <select value={region} onChange={handleRegionChange}>
                <option value="">지역 선택</option>
                {['가평군', '고양시', '과천시', '광명시', '광주시', '구리시', '남양주시', '동두천시', '부천시', '성남시', '수원시', '시흥시', 
                '안산시', '양주시', '양평군', '연천군', '용인시', '의왕시', '의정부시', '평택시', '하남시', '화성시'].map(region => (
                    <option key={region} value={region}>{region}</option>
                ))}
            </select>
            <input
                type="text"
                value={breed}
                onChange={handleBreedChange}
                placeholder="보호종을 입력하세요"
            />
            <button onClick={handleApplyFilter}>조회</button>
        </div>
    );
};

export default ABFilter;
