import './Login.css';
import { useRef } from 'react';
import Nav from '../components/Nav';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const { REACT_APP_SERVER, REACT_APP_CLIENT_ID, REACT_APP_REDIRECT_URI } = process.env;

function Login ({ isLogin, setIsLogin, setLoading, setUserinfo }) {
  const idInput = useRef(null);
  const pwInput = useRef(null);
  const loginError = useRef(null);
  const carousel = useRef(null);
  const keepLogin = useRef(null);
  const navigate = useNavigate();

  //로그인 요청 보내기
  const buttonClick = () => {
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
      console.log(loginError.current.classList)
      loginError.current.classList = "error"
      console.log(loginError.current.classList)
      //Do it//
    })
  }
  //아이디 유효성 검사
  const idTest = () => {
    const idTest = /^[a-z0-9]{4,12}$/;
    loginError.current.classList = "error hidden"
    if(!idTest.test(idInput.current.value)) console.log("아이디 테스트 통과 못함")
  }

  const pwTest = () => {
    const pwTest = /^[a-z0-9]{4,12}$/;
    loginError.current.classList = "error hidden"
    if(!pwTest.test(pwInput.current.value)) console.log("패스워드 테스트 통과 못함")
  }

  const errorHidden = () => {
  
  }

  //회원가입 캐러셀 구현
  const join = () => {
    if(carousel.current.classList.length === 4) carousel.current.classList = "login-contents flex-col a-center j-space-around moveRight";
    else carousel.current.classList = "login-contents flex-col a-center j-space-around";
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
          <div className="login-contents flex-col a-center j-space-around" ref={carousel}>
            <input className="login-input" type="text" ref={idInput} onChange={idTest} placeholder="아 이 디"></input>
            <input className="login-input" type="password" ref={pwInput} onChange={pwTest} placeholder="패 스 워 드"></input>
            <div className="error hidden" ref={loginError} >아이디 또는 패스워드를 확인해주세요!</div>
            <div className="keepLogin">
              <input type="checkbox" ref={keepLogin}/>로그인 상태 유지
            </div>
            <div>
              <button className="loginButton nomalButton" onClick={buttonClick}>로그인</button>
            </div>
            <button className="loginButton nomalButton" onClick={join} >회원가입</button>
            <a className="loginButton kakao flex a-center j-center" href={`https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URI}&response_type=code`}>
              <img className="kakaoLogo" src="https://i.ibb.co/BVSp3jm/ai-3-removebg-preview-1.png" alt="카카오 버튼 아이콘" />
              카카오 로그인
            </a>
            <button className="loginButton google flex a-center j-center" onClick={errorHidden} >구글 로그인</button>
          </div>
          <div className="Join-contents flex-col a-center j-space-around">
            <input className="login-input" type="text" onChange={idTest} placeholder="아 이 디" onFocus={test}></input>
            <div className="error" >알파벳 대소문자, 4~12자리</div>
            <input className="login-input" type="password" onChange={pwTest} placeholder="패 스 워 드"></input>
            <div className="error" >알파벳 대소문자, 4~12자리</div>
            <input className="login-input" type="text" onChange={pwTest} placeholder="이 름(닉네임)"></input>
            <div className="error" >2~10자리</div>
            <input className="login-input" type="text" onChange={pwTest} placeholder="이 메 일"></input>
            <div className="error" >비밀번호 찾기에 쓰입니다</div>
            <div>
              <button className="loginButton nomalButton" onClick={buttonClick}>회원가입</button>
            </div>
            <button className="loginButton nomalButton" onClick={join} >취소</button>
          </div>
        </div>
      </div>
    </div>
    <Nav isLogin={isLogin} page="login" />
    </>
  )
}

export default Login;