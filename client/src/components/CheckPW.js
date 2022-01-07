import './CheckPW.css';
import { useRef } from 'react';
import axios from 'axios';
const { REACT_APP_SERVER } = process.env;

function CheckPW ({ checkPWRef, userinfo }) {

  const inputRef = useRef(null);
  const errRef = useRef(null);

  const pwCheck = () => {
    axios.post(`${REACT_APP_SERVER}/userinfo/checkpw`,
      { password: inputRef.current.value },
      {headers: { authorization: `Bearer ${userinfo.accessToken}`}}
    )
    .then(res => {
    inputRef.current.value = null;
    checkPWRef.current.classList.add("hidden");
    })
    .catch(err => {
      inputRef.current.focus();
      errRef.current.classList.remove("hidden");
    })
  }
  
  const errClose = () => {
    errRef.current.classList.add("hidden");
  }
  
  const close = () => {
    inputRef.current.value = null;
    errRef.current.classList.add("hidden");
    checkPWRef.current.classList.add("hidden");
  }

  return (
    <div ref={checkPWRef} className="modal flex a-center j-center hidden">
      <form className="message flex-col a-center j-center">
        패스워드 확인
        <input ref={inputRef} className="check-input" type="password" autoComplete="false" onKeyDown={errClose}/>
          <div ref={errRef} className="error hidden">패스워드를 확인해주세요!</div>
        <div>
          <button type="button" className="modal-button" onClick={pwCheck}>확 인</button>
          <button type="button" className="modal-button" onClick={close}>취 소</button>
        </div>
      </form>
    </div>
  )
}

export default CheckPW;