import './Login.css';
import { useRef } from 'react';
import Nav from '../components/Nav';
import axios from 'axios';
const { REACT_APP_SERVER } = process.env;

function Login ({ isLogin, setIsLogin }) {
  const idInput = useRef(null);
  const passwordInput = useRef(null);

  //로그인 요청 보내기
  const buttonClick = () => {
    axios.post(`${REACT_APP_SERVER}/auth/login`, 
    {
      id: idInput.current.value,
      password: passwordInput.current.value
    })
    .then(res => {
      //로그인 상태 변경
      setIsLogin(true);
      //받아온 유저 정보 변경

      //Do it//

    })
    //에러 처리
    .catch(err => {
      //에러 메시지 띄우기

      //Do it//

    })
  }
  //로그인 관련 input에 한글 사용 못하게하기
  const inputNoKor = (e) => {
    e.target.value = e.target.value.replace(/[ ㄱ-ㅎ | ㅏ-ㅣ | 가-힣 ]/g,"");
    //에러 문구 띄우는 것으로 바꾸기
    //한글 또는 대문자 일때
  }

  const socialKakao = () => {
    
  }


  return (
    <>
    <div className="Login-page flex-col j-space-around a-center">
      <div className="login-title">BNB</div>
      <div className="login-box flex a-center">
        <div className="login-contents flex-col j-space-between">
          <div>
            <div className="input-name">아이디</div>
            <input className="login-input" type="text" ref={idInput} onChange={inputNoKor}></input>
          </div>
          <div>
            <div className="input-name">패스워드</div>
            <input className="login-input" type="password" ref={passwordInput} onChange={inputNoKor}></input>
          </div>
          <div>
            <div className="error">아이디 또는 패스워드를 확인해주세요!</div>
            <button className="loginButton nomalButton" onClick={buttonClick}>로그인</button>
          </div>
          <button className="loginButton nomalButton">회원가입</button>
          <button className="loginButton kakao flex a-center j-center"> <img className="kakaoLogo" src="https://i.ibb.co/BVSp3jm/ai-3-removebg-preview-1.png" alt="카카오 버튼 아이콘" />카카오 로그인</button>
          <button className="loginButton google flex a-center j-center">구글 로그인</button>
        </div>
      </div>
    </div>
    <Nav isLogin={isLogin} page="login" />
    </>
  )
}

export default Login;


// import './Login.css';
// import { useRef } from 'react';
// import Title from '../components/Title';
// import Nav from '../components/Nav';

// function Login({ isLogin }) {
//   const idInput = useRef(null);
//   const passwordInput = useRef(null);

//   const buttonClick = () => {
//     console.log(idInput.current.value)
//     console.log(passwordInput.current.value)
//   }


//   return (
//     <>
//     {/* <Title title="B N B" /> */}
//     <div className="Login-pages flex-col j-space-around">
//       <div className="login-title">BNB</div>
//       <div className="login-container flex-col">
//         <div className="login-input-box flex-col a-center j-center">
//           <div>
//             <div className="input-name">아이디</div>
//             <input type="text" ref={idInput} ></input>
//           </div>
//           <div>
//             <div className="input-name">패스워드</div>
//             <input type="password" ref={passwordInput} ></input>
//           </div>
//           <div className="error">아이디 또는 패스워드를 확인해주세요!</div>
//           <button onClick={buttonClick}>로그인</button>
//           <button>회원가입</button>
//         </div>
//         <div className="social-box flex-col a-center j-space-evenly">
//           <button className="kakaoButton flex a-center j-center"> <img className="kakaoLogo" src="https://i.ibb.co/BVSp3jm/ai-3-removebg-preview-1.png" alt="카카오 버튼 아이콘" />카카오 로그인</button>
//           <button className="googleButton flex a-center j-center">구글 로그인</button>
//         </div>
//       </div>
//       <div className="blank"></div>
//     </div>
//     <Nav isLogin={isLogin} page="login" />
//     </>
//   )
// }

// export default Login;