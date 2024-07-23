import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../css/mateSearch.module.css';

function MateSearch() {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [mates, setMates] = useState([]);
  const [page, setPage] = useState(1);
  const [size] = useState(10); // 페이지당 항목 수

  useEffect(() => {
    // 도시 목록 가져오기
    axios.get('/member/mate/cities')
      .then(response => {
        setCities(response.data);
      })
      .catch(error => {
        console.error('도시 목록을 가져오는데 실패했습니다:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedCity) {
      // 선택된 도시의 구 목록 가져오기
      axios.get(`/member/mate/districts?city=${selectedCity}`)
        .then(response => {
          setDistricts(response.data);
        })
        .catch(error => {
          console.error('구 목록을 가져오는데 실패했습니다:', error);
        });
    }
  }, [selectedCity]);

  const fetchMates = (city, district, page) => {
    axios.get('/member/mate', {
      params: {
        city,
        district,
        page,
        size,
      },
    })
      .then(response => {
        setMates(response.data);
      })
      .catch(error => {
        console.error('산책 친구 목록을 가져오는데 실패했습니다:', error);
      });
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setSelectedDistrict('');
    setMates([]);
    setPage(1);
    fetchMates(event.target.value, '', 1);
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    setPage(1);
    fetchMates(selectedCity, event.target.value, 1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchMates(selectedCity, selectedDistrict, newPage);
  };

  return (
    <div className={styles.mateSearchContainer}>
      <h1>산책 친구 찾기</h1>
      <div className={styles.mateSearchFilters}>
        <select value={selectedCity} onChange={handleCityChange} className={styles.mateSearchCity}>
          <option value="">도시 선택</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        <select value={selectedDistrict} onChange={handleDistrictChange} className={styles.mateSearchDistrict}>
          <option value="">구 선택</option>
          {districts.map(district => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
      </div>
      <div className={styles.mateSearchResults}>
        {mates.map(mate => (
          <div key={mate.boardMemberId} className={styles.mateSearchResult}>
            <img src={mate.petImagePath} alt={mate.boardMemberNick} />
            <div>
              <h2>{mate.boardMemberNick}</h2>
              <p>{mate.petInfo}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>이전</button>
        <span>{page}</span>
        <button onClick={() => handlePageChange(page + 1)}>다음</button>
      </div>
    </div>
  );
}

export default MateSearch;
