import './Login.css';
import { useState, useRef, useEffect, useCallback } from 'react';
import Nav from '../components/Nav';
import CheckModal from '../components/CheckModal';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const { REACT_APP_SERVER, REACT_APP_CLIENT_ID, REACT_APP_REDIRECT_URI } = process.env;

function Login ({ userinfo, setLoading, setUserinfo }) {
  //필요한 데이터 선언
  const [ gender, setGender ] = useState("아빠");
  const [ findId, setFindId ] = useState("");
  const [ message, setMessage ] = useState("");
  const [ focus, setFocus ] = useState(null);
  const [ idErrMessage, setIdErrMessage ] = useState("");
  const [ emailErrMessage, setEmailErrMessage ] = useState("");

  const func = useCallback(() => focus ? focus.current.focus() : null, [focus])

  //useHistory 에서 useNavigate로 변경됨
  const navigate = useNavigate();

  useEffect(() => {
    if(userinfo) navigate("/");
  },[userinfo])

  //에러 메시지 애니메이션용 Ref
  const idInput = useRef(null);
  const pwInput = useRef(null);
  const loginError = useRef(null);
  const loginContents = useRef(null);
  const keepLogin = useRef(null);
  
  // 캐러셀 용도
  const joinContents = useRef(null);
  const findContents = useRef(null);

  //회원가입 용도
  const signupIdRef = useRef(null);
  const signupPWRef = useRef(null);
  const signupPWRef2 = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  // 에러
  const idErrRef = useRef(null);
  const idErrRef2 = useRef(null);
  const pwErrRef = useRef(null);
  const pwErrRef2 = useRef(null);
  const nameErrRef = useRef(null);
  const emailErrRef = useRef(null);
  const checkRef = useRef(null);

  // 아이디 비밀번호 찾기
  const findIdRef = useRef(null);
  const findPWRef1 = useRef(null);
  const findPWRef2 = useRef(null);
  const findIdMessage = useRef(null);
  const findIdErr = useRef(null);
  const findPWMessage = useRef(null);
  const findPWErr = useRef(null);
  
  
  //로그인 요청 보내기
  const postLogin = (e) => {
    if(e.key && e.key !== "Enter") return ;
    axios.post(`${REACT_APP_SERVER}/auth/login`, 
    {
      id: idInput.current.value,
      password: pwInput.current.value,
      keep: keepLogin.current.value
    },
    {
      withCredentials: true
    }
    )
    .then(res => {
      //받아온 유저 정보 변경
      if(res.data.data.birthday) res.data.data.birthday = res.data.data.birthday.slice(0,10);
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

  //회원가입 요청 보내기
  const signup = (e) => {
    if(e.key && e.key !== "Enter") return ;
    if(!idTest()) {
      setMessage("아이디를 확인해주세요");
      setFocus(signupIdRef)
      return checkRef.current.classList.remove("hidden");
    }
    if(!pwTest() || !compare()) {
      setMessage("비밀번호를 확인해주세요");
      setFocus(signupPWRef)
      return checkRef.current.classList.remove("hidden");
    }
    if(!nameTest()) {
      setMessage("이름을 확인해주세요");
      setFocus(nameRef)
      return checkRef.current.classList.remove("hidden");
    }
    if(!emailTest()) {
      setMessage("이메일을 확인해주세요");
      setFocus(emailRef)
      return checkRef.current.classList.remove("hidden");
    }
    axios.post(`${REACT_APP_SERVER}/userinfo`,
    {
      id: signupIdRef.current.value,
      password: signupPWRef.current.value,
      name: nameRef.current.value,
      email: emailRef.current.value,
      gender: gender === "아빠" ? "male" : "female"
    })
    .then(res => {
      idErrRef2.current.classList.add("hidden")
      signupIdRef.current.value="";
      signupPWRef.current.value="";
      nameRef.current.value="";
      emailRef.current.value="";
      setFocus(null);
      setMessage("회원가입이 완료되었습니다")
      checkRef.current.classList.remove("hidden");
      joinClose();
    })
    .catch(err => {
      
    })
  }


  //로그인 실패 에러 숨기기
  const loginErrHide = () => {
    loginError.current.classList = "error hidden";
  }

  //아이디 유효성 검사
  const idTest = () => {
    const test = /^[a-z0-9]{4,12}$/;
    const result = test.test(signupIdRef.current.value);
    if(!result) {
      setIdErrMessage("알파벳 소문자, 숫자, 4~12자리")
      idErrRef.current.classList.remove("hidden")
      idErrRef2.current.classList.add("hidden")
    }else {
      idErrRef.current.classList.add("hidden")

      axios.get(`${REACT_APP_SERVER}/userinfo?id=${signupIdRef.current.value}`)
      .then(res => {
        idErrRef.current.classList.add("hidden");
        idErrRef2.current.classList.remove("hidden");
      })
      .catch(err => {
        setIdErrMessage("중복된 아이디 입니다")
      idErrRef.current.classList.remove("hidden")
      idErrRef2.current.classList.add("hidden");
      })
    }
    return result;
  }
  //패스워드 유효성 검사
  const pwTest = () => {
    const test = /^[a-zA-Z0-9]{4,24}$/;
    const result = test.test(signupPWRef.current.value);
    if(!result) pwErrRef.current.classList.remove("hidden");
    else pwErrRef.current.classList.add("hidden");
    return result;
  }

  const nameTest = () => {
    const test = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;
    const result = test.test(nameRef.current.value);
    if(!result) nameErrRef.current.classList.remove("hidden");
    else nameErrRef.current.classList.add("hidden");
    return result;
  }

  const emailTest = () => {
    const test = /^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+/;
    const result = test.test(emailRef.current.value);
    if(!result) {
      setEmailErrMessage("유효한 이메일을 적어주세요")
      emailErrRef.current.classList.remove("hidden");
    }else {
      emailErrRef.current.classList.add("hidden")

      axios.get(`${REACT_APP_SERVER}/userinfo?email=${emailRef.current.value}`)
      .then(res => {
      emailErrRef.current.classList.add("hidden");
      })
      .catch(err => {
        setEmailErrMessage("중복된 이메일 입니다");
        emailErrRef.current.classList.remove("hidden");
      })
    };
    return result;
  }


  //회원가입 캐러셀 구현
  const joinOn = () => {
    loginContents.current.classList.add("moveLeft");
    joinContents.current.classList.add("moveLeft");
  }

  const joinClose = () => {
    loginContents.current.classList.remove("moveLeft");
    joinContents.current.classList.remove("moveLeft");
  }

  //아이디 패스워드 찾기 캐러셀
  const findOn = () => {
    loginContents.current.classList.add("moveRight");
    findContents.current.classList.add("moveRight");
  }

  const findClose = () => {
    loginContents.current.classList.remove("moveRight");
    findContents.current.classList.remove("moveRight");
  }

  const findIdSubmit = (e) => {
    if(e.key && e.key !== "Enter") return ;
    axios.get(`${REACT_APP_SERVER}/userinfo/id?email=${findIdRef.current.value}`)
    .then(res => {
      setFindId(res.data.data.id)
      findIdMessage.current.classList.remove("hidden");
      findIdErr.current.classList.add("hidden");
    })
    .catch(err => {
      findIdMessage.current.classList.add("hidden");
      findIdErr.current.classList.remove("hidden");
    })
  }

  const findPWSubmit = (e) => {
    if(e.key && e.key !== "Enter") return ;
    axios.get(`${REACT_APP_SERVER}/userinfo/pw?id=${findPWRef1.current.value}&email=${findPWRef2.current.value}`)
    .then(res => {
      findPWMessage.current.classList.remove("hidden");
      findPWErr.current.classList.add("hidden");
    })
    .catch(err => {
      findPWMessage.current.classList.add("hidden");
      findPWErr.current.classList.remove("hidden");
    })
  }

  const togle = (e) => {
    if(e.currentTarget.classList[3] === "male-togle-back") {
      setGender("엄마")
      e.currentTarget.classList.remove("male-togle-back")
      e.currentTarget.classList.add("female-togle-back")
      e.currentTarget.children[0].classList.add("togle-right")
      e.currentTarget.children[1].classList.add("togle-left")
    }else {
      setGender("아빠")
      e.currentTarget.classList.add("male-togle-back")
      e.currentTarget.classList.remove("female-togle-back")
      e.currentTarget.children[0].classList.remove("togle-right")
      e.currentTarget.children[1].classList.remove("togle-left")
    }
  }

  const compare = () => {
    if(signupPWRef.current.value !== signupPWRef2.current.value) {
      pwErrRef2.current.classList.remove("hidden");
      return false;
    }else {
      pwErrRef2.current.classList.add("hidden");
      return true;
    }
  }


  return (
    <>
    <CheckModal checkRef={checkRef} func={func} message={message}/>
    <div className="Login-page flex-col j-space-around a-center">
      <div className="login-box flex-col a-center j-center">
        <div className="login-title">BNB</div>
        <div className="login-carousel flex j-center">

          <div className="find-contents flex-col a-center j-space-around" ref={findContents}>
            <div className="find-box1 flex-col a-center j-space-between">
              <input ref={findIdRef} className="login-input" type="text" placeholder="이 메 일" onKeyDown={findIdSubmit}></input>
              <button type="button" className="loginButton nomalButton" onClick={findIdSubmit}>아이디 찾기</button>
            </div>
            <div ref={findIdMessage} className="ok hidden">아이디는 "{findId}" 입니다.</div>
            <div ref={findIdErr} className="error hidden">일치하는 정보가 없습니다.</div>
            <div className="find-box2 flex-col a-center j-space-between">
              <input ref={findPWRef1} className="login-input" type="text" placeholder="아 이 디"></input>
              <input ref={findPWRef2} className="login-input" type="text" placeholder="이 메 일" onKeyDown={findPWSubmit}></input>
              <button type="button" className="loginButton nomalButton" onClick={findPWSubmit}>패스워드 찾기</button>
            </div>
            <div ref={findPWErr} className="error hidden">일치하는 정보가 없습니다.</div>
            <div ref={findPWMessage} className="ok hidden">비밀번호가 메일로 발송되었습니다.</div>
            <button type="button" className="loginButton nomalButton" onClick={findClose} >취소</button>
          </div>

          <form className="login-contents flex-col a-center j-space-around" ref={loginContents}>
            <input className="login-input" type="text" ref={idInput} maxLength="12" placeholder="아 이 디" onChange={loginErrHide}></input>
            <input className="login-input" type="password" ref={pwInput} placeholder="패 스 워 드" autoComplete="true" onChange={loginErrHide} onKeyDown={postLogin}></input>
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
            <button type="button" className="loginButton google flex a-center j-center hidden" >구글 로그인</button>
          </form>

          <form className="Join-contents flex-col a-center j-space-around" ref={joinContents}>
            <input ref={signupIdRef} className="login-input" type="text" onChange={idTest} maxLength="12" placeholder="아 이 디"/>
            <div ref={idErrRef} className="error hidden" >{idErrMessage}</div>
            <div ref={idErrRef2} className="ok hidden" >유효한 아이디 입니다</div>
            <input ref={signupPWRef} className="login-input" type="password" onChange={pwTest} maxLength="24" placeholder="패 스 워 드" autoComplete="false"/>
            <input ref={signupPWRef2} className="login-input" type="password" onChange={compare} maxLength="24" placeholder="패 스 워 드" autoComplete="false"/>
            <div ref={pwErrRef} className="error hidden" >알파벳 대소문자, 숫자, 4~24자리</div>
            <div ref={pwErrRef2} className="error hidden" >비밀번호가 일치하지 않습니다</div>
            <input ref={nameRef} className="login-input" type="text" onChange={nameTest} maxLength="10" placeholder="이 름(닉네임)"/>
            <div ref={nameErrRef} className="error hidden" >2~10자리</div>
            <input ref={emailRef} className="login-input" type="text" onChange={emailTest} placeholder="이 메 일" onKeyDown={signup}/>
            <div ref={emailErrRef} className="error hidden" >{emailErrMessage}</div>
            <div className="flex a-center j-space-between male-togle-back " onClick={togle}>
              <div className="togle-in"></div>
              <div className="togle-text">{gender}</div>
            </div>
            <button type="button" className="loginButton nomalButton" onClick={signup}>회원가입</button>
            <button type="button" className="loginButton nomalButton" onClick={joinClose} >취소</button>
          </form>

        </div>
      </div>
    </div>
    <Nav userinfo={userinfo} page="login" />
    </>
  )
}

export default Login;