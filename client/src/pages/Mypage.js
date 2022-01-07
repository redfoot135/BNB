import './Mypage.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from 'react';
import Title from '../components/Title';
import Nav from '../components/Nav';
import FailModal from '../components/FailModal';
import CheckPW from '../components/CheckPW';
import CheckModal from '../components/CheckModal';
import axios from 'axios';
const { REACT_APP_SERVER } = process.env;

function Mypage({ userinfo, setUserinfo }) {
  console.log(userinfo)
  const navigate = useNavigate();
  const failRef = useRef(null);
  const checkPWRef = useRef(null);
  const checkRef = useRef(null);
  
  useEffect(() => {
    if(!userinfo) navigate("/");
  },[navigate, userinfo])

  let birthday = null;
  let dDay = null;
  let now = [];
  if(userinfo && userinfo.birthday) {
    birthday = userinfo.birthday.split("-");
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
    e.target.parentNode.parentNode.lastChild.classList.remove("hidden");
    e.target.parentNode.parentNode.childNodes[1].classList.add("hidden");
  }
  const editClose = (e) => {
    console.log(e.target.parentNode.firstChild.firstChild.value)
    // e.target.parentNode.firstChild.firstChild.value = userinfo[e.target.parentNode.firstChild.firstChild.name];
    console.log(e.target.parentNode.firstChild.firstChild.value)
    e.target.parentNode.classList.add("hidden");
    e.target.parentNode.parentNode.childNodes[1].classList.remove("hidden");
  }


  // 유저정보 변경 요청 보내기
  const changeInfo = (e) => {
    const body = {}
    body[e.currentTarget.parentNode.firstChild.firstChild.name] = e.currentTarget.parentNode.firstChild.firstChild.value;
    axios.patch(`${REACT_APP_SERVER}/userinfo`, body,
    {
      headers: {authorization: `Bearer ${userinfo.accessToken}`},
      withCredentials: true 
    })
    .then(res => {
      const change = { ...userinfo, ...body };
      setUserinfo(change)
      editClose(e)
    })
    .catch(err => {
      failRef.current.classList.remove("hidden")
    })
  }

  const checkPW = () => {
    checkPWRef.current.classList.remove("hidden");
  }

  const test = () => {
    checkRef.current.classList.remove("hidden");

  }

  return (
    <>
    <CheckModal checkRef={checkRef} func={null} message="개발중입니다"/>
    <CheckPW checkPWRef={checkPWRef} userinfo={userinfo}/>
    <FailModal failRef={failRef}/>
    <Title title="내 정 보" />
    <div className="mypage-container flex a-center j-space-evenly" >
      <div className="myinfo flex-col a-center j-space-evenly">
        <div className="sub-box">
          <div className="sub-title flex a-center j-center">
            닉네임
            <img className="edit-icon" src="https://i.ibb.co/drz8k6J/iconmonstr-edit-11-32.png" alt="edit-icon" onClick={edit}/>
          </div>
          <div className="info">{userinfo ? userinfo.name : null}</div>
          <div className="hidden">
            <div>
              <input className="edit-input" type="text" name="name" defaultValue={userinfo ? userinfo.name : null} />
            </div>
            <button className="modal-button" onClick={changeInfo}>수정</button>
            <button className="modal-button" onClick={editClose}>취소</button>
          </div>
        </div>
        <div className="sub-box">
          <div className="sub-title flex a-center j-center">
            아이 이름
            <img className="edit-icon" src="https://i.ibb.co/drz8k6J/iconmonstr-edit-11-32.png" alt="edit-icon" onClick={edit}/>
          </div>
          <div className="info">{userinfo ? userinfo.baby : null}</div>
          <div className="hidden">
            <div>
              <input className="edit-input" type="text" name="baby" defaultValue={userinfo ? userinfo.baby : null}></input>
            </div>
            <button className="modal-button" onClick={changeInfo}>수정</button>
            <button className="modal-button" onClick={editClose}>취소</button>
          </div>
        </div>
        <div className="sub-box">
          <div className="sub-title">오늘까지</div>
          <div className="info">{userinfo && userinfo.birthday ? `${now[0]}주 ${now[1]}일` : null}</div>
        </div>
        <div className="sub-box">
          <div className="sub-title flex a-center j-center">
            출산 예정일 D-{userinfo ? dDay : "000"}
            <img className="edit-icon" src="https://i.ibb.co/drz8k6J/iconmonstr-edit-11-32.png" alt="edit-icon" onClick={edit}/>
          </div>
          <div className="info">{userinfo && userinfo.birthday ? `${birthday[0]}년 ${birthday[1]}월 ${birthday[2]}일` : null}</div>
          <div className="hidden">
            <div>
              <input className="edit-input" name="birthday" type="date" defaultValue={userinfo ? userinfo.birthday : null}></input>
            </div>
            <button className="modal-button" onClick={changeInfo}>수정</button>
            <button className="modal-button" onClick={editClose}>취소</button>
          </div>
        </div>
      </div>
      <div className="mypage-bt-box flex-col a-center j-space-evenly">
        <button type="button" className="mypage-button" name="change" onClick={checkPW}>패스워드 변경</button>
        <button type="button" className="mypage-button" onClick={test}>배우자 연동</button>
        <button type="button" className="mypage-button" onClick={logout}>로그 아웃</button>
        <button type="button" className="mypage-button" name="delete" onClick={checkPW}>회원 탈퇴</button>
      </div>
    </div>
    <Nav userinfo={userinfo} page="mypage"/>
    </>
  )
}

export default Mypage;