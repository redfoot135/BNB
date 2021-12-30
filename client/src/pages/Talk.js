import './Talk.css';
import { useState, useEffect, useRef } from 'react';
import Title from '../components/Title';
import Nav from '../components/Nav';
import Comment from '../components/Comment';
import TalkPage from '../components/TalkPage';
import LoginReqModal from '../components/LoginReqModal';
import axios from 'axios';
const { REACT_APP_SERVER } = process.env;

function Talk({ userinfo, setLoading }) {

  const [ talk, setTalk ] = useState(null);
  const loginRef = useRef(null);
  const weeksRef = useRef(null);

  useEffect(() => {
    // 로그인 안했으면 로그인 요청
    // if(!userinfo) loginRef.current.classList.remove("hidden");
    setLoading(true);
    // 로그인 했으면 데이터 받아오기
    console.log(weeksRef.current.value)
    axios.get(`${REACT_APP_SERVER}/talk?weeks=${weeksRef.current.value}`)
    .then(res => {
      setTalk(res.data);
      setLoading(false);
    })
    .catch(err => {
      setLoading(false);
    })
  }, [])

  // 주차별 정보 받아오기
  const selectWeek = (e) => {
    setLoading(true);
    axios.get(`${REACT_APP_SERVER}/talk?weeks=${weeksRef.current.value}`)
    .then(res => {
      setTalk(res.data);
      setLoading(false);
      console.log(res)
    })
    .catch(err => {
      setLoading(false);
    })
  }


  return (
    <>
    <LoginReqModal loginRef={loginRef} />
    <Title title={!userinfo || userinfo.gender === "female" ? "엄 마 톡" : "아 빠 톡"} />
    <div>
      <select ref={weeksRef} id="select" className="weeks" name="weeks" onChange={selectWeek}>
        <option style={{color:"red"}} value={"0-7"} className="select">0~7주</option>
        <option value={"8-11"}className="select">8~11주</option>
        <option value={"12-15"}className="select">12~15주</option>
        <option value={"16-19"}className="select">16~19주</option>
        <option value={"20-23"}className="select">20~23주</option>
        <option value={"24-27"}className="select">24~27주</option>
        <option value={"28-31"}className="select">28~31주</option>
        <option value={"32-35"}className="select">32~35주</option>
        <option value={"36-39"}className="select">36~39주</option>
        <option value={"40-"}className="select">40주</option>
      </select>
    </div>
    <div className="talk-container flex-col a-center" >

      <TalkPage />
      <TalkPage />
      <TalkPage />
      <TalkPage />
      <TalkPage />
      <TalkPage />
      <TalkPage />
      
    </div>
    <Nav userinfo={userinfo} page="talk"/>
    </>
  )
}

export default Talk;