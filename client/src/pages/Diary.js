import './Diary.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Title from '../components/Title';
import Nav from '../components/Nav';
import Page from '../components/Page';

function Diary({ userinfo }) {

  const [diaries, setDiaries] = useState(null);

  useEffect(()=> {
    // 로그인 되어 있을 때만 데이터 받아오기
    if(userinfo) {
      axios.get('https://localhost:8080/Diary', {
        headers: {
          authorization: `Bearer ${userinfo.accessToken}`
        }
      })
      .then(data => {
        // 다이어리 데이터 상태로 만들어주기
        setDiaries(data);
      })
      .catch(data => {
        // 토큰이 만료된 것이면
        if(data.response.data.err === "Token has expired") {
          // 리프레시 토큰 있으면 엑세스 토큰 재발급 요청
          
        }
      })
    }
  },[]);

  
  return (
    <>
    <Title title="일 기 장" />
    <div className="diary-container flex-col a-center">
      <div className="diary">add 버튼 들어갈 공간</div>

      <Page />
      <Page />
      <Page />
      <Page />
      <Page />
      <Page />
      <Page />
      <Page />
      <Page />
      <Page />
      <Page />
      <Page />
      <Page />
      
      
    </div>
    <Nav userinfo={userinfo} page="diary"/>
    </>
  )
}

export default Diary;