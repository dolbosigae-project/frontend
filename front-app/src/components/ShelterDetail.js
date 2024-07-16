import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ShelterDetail = () => {
    const { shID } = useParams();
    const [shelter, setShelter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShelter = async () => {
            try {
                const response = await axios.get(`https://nam3324.synology.me:32800/shelter/${shID}`);
                setShelter(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchShelter();
    }, [shID]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <p>센터명 : {shelter.shName}</p>
            <p>센터번호 : {shelter.shTel}</p>
            <p>센터지역 : {shelter.shRegion}</p>
            <p>구조대상동물: {shelter.shAnimalType}</p>
            <p>센터주소 : {shelter.shAddress}</p>
            <p>센터운영시간 : {shelter.shHour}</p>
        </div>
    );
};

export default ShelterDetail;
