import {useEffect} from 'react';

const {kakao} = window;

export default function KakaoMap() {
  const style = {
    width : '800px',
    height : '800px',
    border: '1px solid black',
    marginTop: '50px',
    marginLeft: '50px',
    marginBottom: '50px'
  }
  //script 태그로 라이브러리 읽으면 window 객체에 등록
  // console.log(window);
  useEffect(() => {
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(37.407546, 127.115474),
      level: 3
    };
    
    var map = new kakao.maps.Map(container, options);
  },[]);
  return <div id="map" style={style}></div>;
}