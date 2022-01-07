import axios from 'axios';
import req from 'express/lib/request';
import { useRef, useState } from 'react';
import './FirstCheck.css';
import { useNavigate } from "react-router-dom";
const { REACT_APP_SERVER } = process.env;

function ChoiceModal ({ firstRef, userinfo }) {

  const [ gender, setGender ] = useState("아빠");
  const [ d, setD ] = useState(0);
  const [ baby, setBaby ] = useState("");
  const idx = useRef((userinfo && userinfo.gender) ? 4 : 5);
  const window = useRef(null);
  const babyRef = useRef(null);
  const dateRef = useRef(null);
  const nameRef = useRef(null);
  const nameErrRef = useRef(null);
  const babyErrRef = useRef(null);
  const navigate = useNavigate();


  const close = () => {
    firstRef.current.classList.add("hidden");
  }

  const right = () => {
    window.current.children[idx.current].classList.add("right");
    idx.current = idx.current-1;
    window.current.children[idx.current].classList.remove("left");

  }

  const left = () => {
    window.current.children[idx.current].classList.add("left");
    idx.current = idx.current+1;
    window.current.children[idx.current].classList.remove("right");
  }

  const dDay = () => {
    const birth = new Date(dateRef.current.value);
    birth.setHours(birth.getHours() - 9);
    setD(Math.ceil((birth - new Date())/(1000*60*60*24)));

  }

  const submit = () => {
    if(!nameTest()) {
      left();
      left();
      left();
      left();
      nameRef.current.focus();
    }else if(!babyTest()) {
      left();
      left();
      left();
      babyRef.current.focus();
    }else if(!dateRef.current.value) {
      left();
      left();
      dateRef.current.focus();
    }
    
    else {
      const body = {
        baby: baby,
        birthday: dateRef.current.value
      }
  
      if(nameRef.current && nameRef !== undefined && nameRef !== "") {
        body.name = nameRef.current.value;
        body.gender = gender === "아빠" ? "male" : "female";
      };
  
      axios.post(`${REACT_APP_SERVER}/userinfo/baby`,
        body,
        {
          headers: {
            authorization: `Bearer ${userinfo.accessToken}`
          }
        }
      )
      .then(res => {
        navigate("/")
      })
      .catch(err => {
  
      })
    }
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

  const nameTest = () => {
    const test = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣~!@#$%^&*_+₩-]{2,10}$/;
    const result = test.test(nameRef.current.value);
    if(!result) nameErrRef.current.classList.remove("hidden");
    else nameErrRef.current.classList.add("hidden");
    return result;
  }

  const babyTest = () => {
    const test = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣~!@#$%^&*_+₩-]{2,10}$/;
    const result = test.test(babyRef.current.value);
    if(!result) babyErrRef.current.classList.remove("hidden");
    else babyErrRef.current.classList.add("hidden");
    return result;
  }


  return (
    <div ref={firstRef} className="modal flex a-center j-center">
      <div className="first-modal flex-col a-center j-center">
        <div ref={window} className="window">

          <div className="page flex-col a-center j-space-evenly left">
            <div className="modal-title">{baby}의 성장과정을<br/>함께 기록해봐요!!</div>
            <div>
              <button className="first-modal-button" name="ok" onClick={left}>이전</button>
              <button className="first-modal-button" name="ok" onClick={submit}>시작하기</button>
            </div>
          </div>

          <div className="page flex-col a-center j-space-evenly left">
            <div className="modal-title">{d}일 남았네요<br/>기대되지 않나요?</div>
            <div>
              <button className="first-modal-button" name="ok" onClick={left}>이전</button>
              <button className="first-modal-button" name="ok" onClick={right}>다음</button>
            </div>
          </div>

          <div className="page flex-col a-center j-space-evenly left">
            <div className="modal-title">예쁜 이름이네요<br/>예정일은요?</div>
            <input ref={dateRef} className="modal-input" type="date" onChange={dDay}></input>
            <div>
              <button className="first-modal-button" name="ok" onClick={left}>이전</button>
              <button className="first-modal-button" name="ok" onClick={right}>다음</button>
            </div>
          </div>

          <div className="page flex-col a-center j-space-evenly left">
            <div className="modal-title">우리 아이 이름은 <br/>어떻게 될까요?</div>
            <input ref={babyRef} className="modal-input" placeholder="이름을 적어주세요" onChange={babyTest}/>
            <div ref={babyErrRef} className='error'>한글, 영문, 특수문자 가능, 2~10자</div>
            <div>
              <button className="first-modal-button" name="ok" onClick={left}>이전</button>
              <button className="first-modal-button" name="ok" onClick={() => {right(); setBaby(babyRef.current.value)}}>다음</button>
            </div>
          </div>

          {gender ? <div className="page flex-col a-center j-space-evenly left">
            <div className="modal-title">당신은 누구인가요?</div>
            <input ref={nameRef} className="modal-input" placeholder="이름을 적어주세요" onChange={nameTest}/>
            <div ref={nameErrRef} className='error'>한글, 영문, 특수문자 가능, 2~10자</div>
            <div className="flex a-center j-space-between male-togle-back " onClick={togle}>
              <div className="togle-in"></div>
              <div className="togle-text">{gender}</div>
            </div>
            <div>
              <button className="first-modal-button" name="ok" onClick={left}>이전</button>
              <button className="first-modal-button" name="ok" onClick={right}>다음</button>
            </div>
          </div> : null}

          <div className="page flex-col a-center j-space-evenly">
            <div className="modal-title">환영합니다</div>
            <img className="loading-img" src="https://i.ibb.co/mvPpfqY/pngwing-com-1.png" alt="loading img" />
            <div>
              <button className="first-modal-button" name="ok" onClick={right}>다음</button>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default ChoiceModal;