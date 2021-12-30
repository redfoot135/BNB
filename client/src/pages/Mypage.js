import './Mypage.css';
import { useNavigate } from "react-router-dom";
import Title from '../components/Title';
import Nav from '../components/Nav';
import axios from 'axios';
import { useEffect } from 'react';
const { REACT_APP_SERVER } = process.env;

function Mypage({ userinfo, setUserinfo }) {

  const navigate = useNavigate();
  
  useEffect(() => {
    if(!userinfo) navigate("/");
  },[])

  let birthday = null;
  let dDay = null;
  let now = [];
  if(userinfo && userinfo.birthday) {
    console.log(userinfo.birthday)
    birthday = userinfo.birthday.slice(0, 10).split("-");
    const birth = new Date(userinfo.birthday);
    // 한국 표준시로 변경
    birth.setHours(birth.getHours() - 9);
    dDay = Math.ceil((birth - new Date())/(1000*60*60*24))
    now.push(Math.floor((280-dDay)/7));
    now.push((280-dDay)%7)
  }

  const logout = () => {
    axios.post(`${REACT_APP_SERVER}/auth/logout`, {}, { withCredentials: true })
    .then(res => {
    })
    setUserinfo(null);
    navigate("/");
  }
  
  // 에디트 창 열고 닫기
  const edit = (e) => {
    e.currentTarget.parentNode.parentNode.lastChild.classList.remove("hidden");
    e.currentTarget.parentNode.parentNode.childNodes[1].classList.add("hidden");
  }
  const editClose = (e) => {
    e.currentTarget.parentNode.classList.add("hidden");
    e.currentTarget.parentNode.parentNode.childNodes[1].classList.remove("hidden");
  }


  // 유저정보 변경 요청 보내기
  const changeInfo = (e) => {
    console.log(e.currentTarget.parentNode.firstChild.value)
  }


  return (
    <>
    <Title title="내 정 보" />
    <div className="mypage-container flex a-center j-space-evenly" >
      <div className="myinfo flex-col a-center j-space-evenly">
        <div className="sub-box">
          <div className="sub-title flex a-center j-center">
            닉네임
            <img className="edit" src="https://i.ibb.co/drz8k6J/iconmonstr-edit-11-32.png" alt="edit-icon" onClick={edit}/>
          </div>
          <div className="info">{userinfo ? userinfo.name : null}</div>
          <div className="hidden">
            <input className="" type="text" value={userinfo ? userinfo.name : null}></input>
            <button onClick={changeInfo}>수정</button>
            <button onClick={editClose}>취소</button>
          </div>
        </div>
        <div className="sub-box">
          <div className="sub-title flex a-center j-center">
            아이 이름
            <img className="edit" src="https://i.ibb.co/drz8k6J/iconmonstr-edit-11-32.png" alt="edit-icon" onClick={edit}/>
          </div>
          <div className="info">{userinfo ? userinfo.baby : null}</div>
          <div className="hidden">
            <input className="" type="text" value={userinfo ? userinfo.baby : null}></input>
            <button onClick={changeInfo}>수정</button>
            <button onClick={editClose}>취소</button>
          </div>
        </div>
        <div className="sub-box">
          <div className="sub-title">오늘까지</div>
          <div className="info">{userinfo ? `${now[0]}주 ${now[1]}일` : null}</div>
        </div>
        <div className="sub-box">
          <div className="sub-title flex a-center j-center">
            출산 예정일 D-{userinfo ? dDay : "000"}
            <img className="edit" src="https://i.ibb.co/drz8k6J/iconmonstr-edit-11-32.png" alt="edit-icon" onClick={edit}/>
          </div>
          <div className="info">{userinfo ? `${birthday[0]}년 ${birthday[1]}월 ${birthday[2]}일` : null}</div>
          <div className="hidden">
            <input className="date" type="date"></input>
            <button onClick={changeInfo}>수정</button>
            <button onClick={editClose}>취소</button>
          </div>
        </div>
      </div>
      <div className="mypage-bt-box flex-col a-center j-space-evenly">
        <button type="button" className="mypage-button" >패스워드 변경</button>
        <button type="button" className="mypage-button" >배우자 연동</button>
        <button type="button" className="mypage-button" onClick={logout}>로그 아웃</button>
        <button type="button" className="mypage-button" >회원 탈퇴</button>
      </div>
    </div>
    <Nav userinfo={userinfo} page="mypage"/>
    </>
  )
}

export default Mypage;