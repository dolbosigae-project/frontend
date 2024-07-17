import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ShelterList = () => {
    const [shelters, setShelters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState('선택');
    const [filteredShelters, setFilteredShelters] = useState([]);

    useEffect(() => {
        const fetchShelters = async () => {
            try {
                const response = await axios.get('https://nam3324.synology.me:32800/shelter');
                setShelters(response.data);
                setFilteredShelters(response.data);  // 처음 로드 시 전체 쉼터 정보를 설정합니다.
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchShelters();
    }, []);

    const handleFilterChange = (event) => {
        setSelectedRegion(event.target.value);
    };

    const filterShelters = () => {
        if (selectedRegion === '선택') {
            setFilteredShelters(shelters); // 선택 항목인 경우 전체 쉼터 정보를 설정합니다.
        } else {
            const filtered = shelters.filter(shelter => shelter.shRegion === selectedRegion);
            setFilteredShelters(filtered);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Shelter List</h1>
            <div>
                <select value={selectedRegion} onChange={handleFilterChange}>
                    <option>선택</option>
                    <option>가평군</option>
                    <option>고양시</option>
                    <option>과천시</option>
                    <option>광명시</option>
                    <option>광주시</option>
                    <option>구리시</option>
                    <option>남양주시</option>
                    <option>동두천시</option>
                    <option>부천시</option>
                    <option>성남시</option>
                    <option>수원시</option>
                    <option>시흥시</option>
                    <option>안산시</option>
                    <option>양주시</option>
                    <option>양평군</option>
                    <option>연천군</option>
                    <option>용인시</option>
                    <option>의왕시</option>
                    <option>의정부시</option>
                    <option>평택시</option>
                    <option>하남시</option>
                    <option>화성시</option>
                </select>
                <button onClick={filterShelters}>조회</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>센터지역</th>
                        <th>센터명</th>
                        <th>센터번호</th>
                        <th>센터주소</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredShelters.map((shelter) => (
                        <tr key={shelter.shID}>
                            <td>{shelter.shRegion}</td>
                            <td>
                                <Link to={`/shelter/${shelter.shID}`}>
                                    {shelter.shName}
                                </Link>
                            </td>
                            <td>{shelter.shTel}</td>
                            <td>{shelter.shAddress}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShelterList;
