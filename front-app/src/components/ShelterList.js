// src/ShelterList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ShelterList = () => {
    const [shelters, setShelters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShelters = async () => {
            try {
                const response = await axios.get('https://nam3324.synology.me:32800/shelter');
                setShelters(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchShelters();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Shelter List</h1>
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
                    {shelters.map((shelter, index) => (
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
