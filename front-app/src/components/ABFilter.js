import React, { useState } from 'react';

const ABFilter = ({ onFilterChange }) => {
    const [region, setRegion] = useState('선택');
    const [centerName, setCenterName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [breed, setBreed] = useState('');

    const handleRegionChange = (event) => {
        setRegion(event.target.value);
    };

    const handleCenterNameChange = (event) => {
        setCenterName(event.target.value);
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleBreedChange = (event) => {
        setBreed(event.target.value);
    };

    const handleApplyFilter = () => {
        onFilterChange({
            region,
            centerName,
            startDate,
            endDate,
            breed
        });
    };

    return (
        <div className="filter">
            <label>
                지역:
                <select value={region} onChange={handleRegionChange}>
                    <option value="선택">선택</option>
                    {['가평군', '고양시', '과천시', '광명시', '광주시', '구리시', '남양주시', '동두천시', '부천시', '성남시', '수원시', '시흥시',
                    '안산시', '양주시', '양평군', '연천군', '용인시', '의왕시', '의정부시', '평택시', '하남시', '화성시'].map(region => (
                        <option key={region} value={region}>{region}</option>
                    ))}
                </select>
            </label>
            <label>
                센터명:
                <input
                    type="text"
                    value={centerName}
                    onChange={handleCenterNameChange}
                    placeholder="센터명을 입력하세요"
                />
            </label>
            <label>
                시작일:
                <input
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                />
            </label>
            <label>
                종료일:
                <input
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                />
            </label>
            <label>
                품종:
                <input
                    type="text"
                    value={breed}
                    onChange={handleBreedChange}
                    placeholder="품종을 입력하세요"
                />
            </label>
            <button onClick={handleApplyFilter}>조회</button>
        </div>
    );
};

export default ABFilter;
