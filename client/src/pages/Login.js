import './Login.css';
import { useState, useRef } from 'react';
import Nav from '../components/Nav';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const { REACT_APP_SERVER, REACT_APP_CLIENT_ID, REACT_APP_REDIRECT_URI } = process.env;

function Login ({ isLogin, setIsLogin, setLoading, setUserinfo }) {
  //필요한 데이터 선언
  const [ findId, setFindId ] = useState("");

  //useHistory 에서 useNavigate로 변경됨
  const navigate = useNavigate();

  //에러 메시지 애니메이션용 Ref
  const idInput = useRef(null);
  const pwInput = useRef(null);
  const loginError = useRef(null);
  const loginContents = useRef(null);
  const keepLogin = useRef(null);
  
  // 캐러셀 용도
  const joinContents = useRef(null);
  const findContents = useRef(null);

  //로그인 요청 보내기
  const postLogin = () => {
    axios.post(`${REACT_APP_SERVER}/auth/login`, 
    {
      id: idInput.current.value,
      password: pwInput.current.value,
      keep: keepLogin.current.value
    })
    .then(res => {
      //로그인 상태 변경
      setIsLogin(true);
      //받아온 유저 정보 변경
      setUserinfo(res.data.data);
      //로딩 끝내고 홈으로 이동
      navigate("/");
    })
    //에러 처리
    .catch(err => {
      //에러 메시지 띄우기
      loginError.current.classList = "error"
    })
  }




  //로그인 실패 에러 숨기기
  const loginErrHide = () => {
    loginError.current.classList = "error hidden";
  }

  //아이디 유효성 검사
  const idTest = () => {
    const idTest = /^[a-z0-9]{4,12}$/;
    if(!idTest.test(idInput.current.value)) console.log("아이디 테스트 통과 못함")
  }
  //패스워드 유효성 검사
  const pwTest = () => {
    const pwTest = /^[a-z0-9]{4,24}$/;
    if(!pwTest.test(pwInput.current.value)) console.log("패스워드 테스트 통과 못함")
  }


  //회원가입 캐러셀 구현
  const joinOn = () => {
    loginContents.current.classList = "login-contents flex-col a-center j-space-around moveLeft";
    joinContents.current.classList = "Join-contents flex-col a-center j-space-around moveLeft";
  }

  const joinClose = () => {
    loginContents.current.classList = "login-contents flex-col a-center j-space-around";
    joinContents.current.classList = "Join-contents flex-col a-center j-space-around";
  }

  //아이디 패스워드 찾기 캐러셀
  const findOn = () => {
    loginContents.current.classList = "login-contents flex-col a-center j-space-around moveRight";
    findContents.current.classList = "find-contents flex-col a-center j-space-around moveRight";
  }

  const findClose = () => {
    loginContents.current.classList = "login-contents flex-col a-center j-space-around";
    findContents.current.classList = "find-contents flex-col a-center j-space-around";
  }

  const test =(e) => {
    console.log(e)
  }


  return (
    <>
    <div className="Login-page flex-col j-space-around a-center">
      <div className="login-box flex-col a-center j-center">
        <div className="login-title">BNB</div>
        <div className="login-carousel flex" >

          <div className="find-contents flex-col a-center j-space-around" ref={findContents}>
            <div className="find-box1 flex-col a-center j-space-between">
              <input className="login-input" type="text" placeholder="이 메 일"></input>
              <button type="button" className="loginButton nomalButton" onClick={postLogin}>아이디 찾기</button>
            </div>
            <div className="error">아이디는 "{findId}" 입니다.</div>
            <div className="error">일치하는 정보가 없습니다.</div>
            <div className="find-box2 flex-col a-center j-space-between">
              <input className="login-input" type="text" placeholder="아 이 디"></input>
              <input className="login-input" type="text" placeholder="이 메 일"></input>
              <button type="button" className="loginButton nomalButton" onClick={postLogin}>패스워드 찾기</button>
            </div>
            <div className="error ">일치하는 정보가 없습니다.</div>
            <div className="error ">비밀번호가 메일로 발송되었습니다.</div>
            <div className="error hidden">등록된 이메일로<br/>임시 패스워드가 발송되었습니다.</div>
            <button type="button" className="loginButton nomalButton" onClick={findClose} >취소</button>
          </div>

          <form className="login-contents flex-col a-center j-space-around" ref={loginContents}>
            <input className="login-input" type="text" ref={idInput} maxLength="12" placeholder="아 이 디" onChange={loginErrHide}></input>
            <input className="login-input" type="password" ref={pwInput} placeholder="패 스 워 드" autoComplete="true" onChange={loginErrHide}></input>
            <div className="error hidden" ref={loginError} >아이디 또는 패스워드를 확인해주세요!</div>
            <div className="keepLogin">
              <input type="checkbox" ref={keepLogin}/>로그인 상태 유지
            </div>
            <div>
              <button type="button" className="loginButton nomalButton" onClick={postLogin}>로그인</button>
            </div>
            <button type="button" className="loginButton nomalButton" onClick={joinOn} >회원가입</button>
            <button type="button" className="loginButton nomalButton" onClick={findOn} >아이디 / 비밀번호 찾기</button>
            <a className="loginButton kakao flex a-center j-center" href={`https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URI}&response_type=code`}>
              <img className="kakaoLogo" src="https://i.ibb.co/BVSp3jm/ai-3-removebg-preview-1.png" alt="카카오 버튼 아이콘" />
              카카오 로그인
            </a>
            <button type="button" className="loginButton google flex a-center j-center" >구글 로그인</button>
          </form>

          <form className="Join-contents flex-col a-center j-space-around" ref={joinContents}>
            <input className="login-input" type="text" onChange={idTest} maxLength="12" placeholder="아 이 디" onFocus={test}></input>
            <div className="error" >알파벳 대소문자, 4~12자리</div>
            <input className="login-input" type="password" onChange={pwTest} maxLength="24" placeholder="패 스 워 드" autoComplete="true"></input>
            <div className="error" >알파벳 대소문자, 4~24자리</div>
            <input className="login-input" type="text" onChange={pwTest} maxLength="10" placeholder="이 름(닉네임)"></input>
            <div className="error" >2~10자리</div>
            <input className="login-input" type="text" onChange={pwTest} placeholder="이 메 일"></input>
            <div className="error" >비밀번호 찾기에 쓰입니다</div>
            <button type="button" className="loginButton nomalButton" onClick={postLogin}>회원가입</button>
            <button type="button" className="loginButton nomalButton" onClick={joinClose} >취소</button>
          </form>

        </div>
      </div>
    </div>
    <Nav isLogin={isLogin} page="login" />
    </>
  )
}

export default Login;