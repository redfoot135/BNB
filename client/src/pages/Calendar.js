import './Calendar.css';
import { useState, useEffect, useRef } from 'react';
import Title from '../components/Title';
import Nav from '../components/Nav';
import ChoiceModal from '../components/ChoiceModal';
import CheckModal from '../components/CheckModal';
import { v4 } from 'uuid';
import axios from 'axios';
const { REACT_APP_SERVER } = process.env;

function Calendar({ userinfo }) {

  const [ schedules, setSchedules ] = useState([]);
  const [ year, setYear ] = useState(Number(new Date().getFullYear()));
  const [ month, setMonth ] = useState(Number(new Date().getMonth()));
  const [ date, setDate ] = useState(Number(new Date().getDate()));
  // const [ func, setFunc ] = useState("");
  const [ message, setMessage ] = useState("");
  // const [ idx, setIdx ] = useState("");
  // const [ text, setText ] = useState("");
  // const [ time, setTime ] = useState("");

  const addRef = useRef(null);
  const textRef = useRef(null);
  const timeRef = useRef(null);
  const choiceRef1 = useRef(null);
  const choiceRef2 = useRef(null);
  const choiceRef3 = useRef(null);
  const btBoxRef = useRef(null);
  const checkRef = useRef(null);
  const text = useRef("");
  const time = useRef("");
  const idx = useRef(null);

  useEffect(() => {
    if(userinfo) {
      axios.get(`${REACT_APP_SERVER}/calendar?date=${year}-${month < 9 ? "0" + (month+1) : month+1}-${date < 10 ? "0" + date : date}`, {
        headers: {
          authorization: `Bearer ${userinfo.accessToken}`
        }
      })
      .then(res => {
        setSchedules(res.data.data);
      })
    }
  },[ year, month, date, userinfo])

  const prevLastDate = Number(new Date(year, month, 0).getDate());
  const lastDate = Number(new Date(year, month+1, 0).getDate());
  const lastDateDay = Number(new Date(year, month+1, 0).getDay());
  const firstDateDay = Number(new Date(year, month, 1).getDay());
  
  // 날짜 확인
  // console.log(year, "년", month+1, "월", date, "일")

  const prevMonthDates = [];
  for(let i = 0; i < firstDateDay; i++) {
    prevMonthDates.unshift(prevLastDate-i);
  }
  const thisMonthDates = [...new Array(lastDate+1).keys()].slice(1);
  const nextMonthDates = [];
  for(let i = 1; i <= 6-lastDateDay; i++) {
    nextMonthDates.push(i);
  }

  const prevMonth = () => {
    if(month === 0) {
      setYear(year-1);
      setMonth(11);
    } else setMonth(month-1);
  }

  const nextMonth = () => {
    if(month === 11) {
      setYear(year+1);
      setMonth(0);
    } else setMonth(month+1);
  }
  
  const changeDate = (e) => {
    // 달이 바뀌는 경우
    if(e.target.attributes.name && e.target.attributes.name.value === "prev") prevMonth();
    if(e.target.attributes.name && e.target.attributes.name.value === "next") nextMonth();
    setDate(Number(e.target.innerText))
  }

  
  const submit = () => {
    axios.post(`${REACT_APP_SERVER}/calendar`,
    {
      date : `${year}-${month < 9 ? "0" + (month+1) : month+1}-${date < 10 ? "0" + date : date}`,
      time : timeRef.current.value,
      text: textRef.current.value
    },
    {
      headers: {
        authorization: `Bearer ${userinfo.accessToken}`
      }
    })
    .then(res => {
      setSchedules([...schedules, res.data.data].sort((a,b) => Number(a.time.slice(0,2)+a.time.slice(3)) - Number(b.time.slice(0,2)+b.time.slice(3))))
      close();
    })
  }

  const open = () => {
    addRef.current.classList.add("add-open");
    timeRef.current.classList.remove("hidden");
    textRef.current.classList.remove("hidden");
    btBoxRef.current.classList.remove("hidden");
  }

  const close = (e) => {
    addRef.current.classList.remove("add-open");
    timeRef.current.classList.add("hidden");
    textRef.current.classList.add("hidden");
    btBoxRef.current.classList.add("hidden");
    textRef.current.value = "";
    timeRef.current.value = "09:00";
    if(e) e.stopPropagation();
  }

  const addSchedule = () => {
    // func.current = "submit";
    // setFunc("submit");
    // message.current = "일정을 등록합니다";
    // setMessage("일정을 등록합니다");
    choiceRef1.current.classList.remove("hidden");
  }

  const eraseSchedule = (e) => {
    idx.current = Number(e.target.attributes[3].value);
    // setIdx(Number(e.target.attributes[3].value));
    // func.current = "erase";
    // setFunc("erase");
    // message.current = "일정을 삭제합니다";
    // setMessage("일정을 삭제합니다");
    choiceRef2.current.classList.remove("hidden");
    e.stopPropagation()
  }

  const erase = () => {
    axios.delete(`${REACT_APP_SERVER}/calendar?id=${schedules[idx.current].id}`, {
      headers: {
        authorization: `Bearer ${userinfo.accessToken}`
      }
    })
    .then(res => {
      setSchedules([...schedules.slice(0, idx.current), ...schedules.slice(idx.current+1)]);
      // message.current = "삭제되었습니다";
      setMessage("삭제되었습니다")
      checkRef.current.classList.remove("hidden");
    })
    .catch(err => {
      if(!err.response) {
        // message.current = "서버 연결이 끊어졌습니다";
        setMessage("서버 연결이 끊어졌습니다");
        checkRef.current.classList.remove("hidden");
      } else {
        setSchedules([...schedules.slice(0, idx.current), ...schedules.slice(idx.current+1)]);
        // message.current = "삭제되었습니다";
        setMessage("삭제되었습니다")
        checkRef.current.classList.remove("hidden");
      }
    })
  }

  const editOpen = (e) => {
    idx.current = Number(e.target.attributes[3].value);
    // setIdx(Number(e.target.attributes[3].value));
    // func.current = "edit";
    // setFunc("edit");
    // message.current = "일정을 수정합니다";
    // setMessage("일정을 등록합니다");
    e.target.parentNode.parentNode.children[1].classList.remove("hidden")
    e.target.parentNode.parentNode.children[2].classList.add("hidden")
    e.target.parentNode.parentNode.children[3].classList.remove("hidden")
    e.target.parentNode.parentNode.children[4].classList.add("hidden")
  }

  const editClose = (e) => {
    e.target.parentNode.parentNode.parentNode.children[1].classList.add("hidden")
    e.target.parentNode.parentNode.parentNode.children[2].classList.remove("hidden")
    e.target.parentNode.parentNode.parentNode.children[3].classList.add("hidden")
    e.target.parentNode.parentNode.parentNode.children[4].classList.remove("hidden")
    e.target.parentNode.parentNode.parentNode.children[1].value = e.target.parentNode.parentNode.parentNode.children[2].innerText;
    e.target.parentNode.parentNode.parentNode.children[3].firstChild.value = e.target.parentNode.parentNode.parentNode.children[4].innerText;
  }

  const edit = (e) => {
    text.current = e.target.parentNode.parentNode.firstChild.value;
    time.current = e.target.parentNode.parentNode.parentNode.children[1].value;
    choiceRef3.current.classList.remove("hidden");
    // setText(e.target.parentNode.parentNode.firstChild.value);
    // setTime(e.target.parentNode.parentNode.parentNode.children[1].value);
  }

  const editSubmit = () => {
    axios.patch(`${REACT_APP_SERVER}/calendar`,
    {
      id: schedules[idx.current].id,
      time: time.current,
      text: text.current
    },
    {
      headers: {
        authorization: `Bearer ${userinfo.accessToken}`
      }
    })
    .then(res => {
      setSchedules([...schedules.slice(0, idx.current), {...schedules[idx.current], ...res.data.data}, ...schedules.slice(idx.current+1)].sort((a,b) => Number(a.time.slice(0,2)+a.time.slice(3)) - Number(b.time.slice(0,2)+b.time.slice(3))));
      setMessage("수정되었습니다");
      checkRef.current.classList.remove("hidden");
    })
    .catch(err => {
      // !err.response ? message = "서버 연결이 끊어졌습니다" : message = "다시 시도해주세요";
      !err.response ? setMessage("서버 연결이 끊어졌습니다") : setMessage("다시 시도해주세요");
      checkRef.current.classList.remove("hidden");
    })
  }

  return (
    <>
    <CheckModal checkRef={checkRef} func={null} message={message}/>
    <ChoiceModal choiceRef={choiceRef1} func={submit} message="일정을 등록합니다"/>
    <ChoiceModal choiceRef={choiceRef2} func={erase} message="일정을 삭제합니다"/>
    <ChoiceModal choiceRef={choiceRef3} func={editSubmit} message="일정을 수정합니다"/>
    <Title title="일 정 표" />
    <div className="Calendar-container flex a-center j-space-evenly" >
      <div className="calendar-box flex-col">
        <div className="check-date flex a-center j-center">
          <div className="calendar-button" onClick={prevMonth}>&lt;</div>
          <div>{year}년 {month+1}월</div>
          <div className="calendar-button" onClick={nextMonth}>&gt;</div>
        </div>
        <div className="calendar flex-col">
          <div className="week">
            <div className="red">일</div>
            <div>월</div>
            <div>화</div>
            <div>수</div>
            <div>목</div>
            <div>금</div>
            <div className="blue">토</div>
          </div>
          <div className="dates">
            {prevMonthDates.map(el => <div className="gray" key={v4()} name="prev" onClick={changeDate}>{el}</div>)}
            {thisMonthDates.map((el, idx) => {
              let className = "";
              if(idx+1 === date) className = className + "today";
              if((firstDateDay + idx) % 7 === 0) className = className + " red";
              if((firstDateDay + idx) % 7 === 6) className = className + " blue";
              return <div className={className} key={v4()} onClick={changeDate}>{el}</div>
            })}
            {nextMonthDates.map(el => <div className="gray" key={v4()} name="next" onClick={changeDate}>{el}</div>)}
          </div>
        </div>
      </div>
      <div className="schedule-box flex-col a-center">
        {/* <div className="schedules-today">
          {date}일 일정
        </div>
        <div className="schedules flex-col a-center"> */}
          <div ref={addRef} className="add-schedule flex-col a-center" onClick={open}>
            +
            <input ref={timeRef} className="edit-input hidden" type="time" defaultValue={"09:00"}/>
            <textarea ref={textRef} className="add-text hidden" placeholder="해야할 일"/>
            <div ref={btBoxRef} className="flex hidden">
              <button type="button" className="modal-button" onClick={close}>취소하기</button>
              {/* <button type="button" className="modal-button">새로고침</button> */}
              <button type="button" className="modal-button" onClick={addSchedule}>작성하기</button>
            </div>
          </div>
          {schedules.map((el, idx) => {
            return  <div className="schedule" key={v4()}>
                      <div className="delete">
                        <img className="delete-icon" src="https://i.ibb.co/drz8k6J/iconmonstr-edit-11-32.png" alt="delete-icon" idx={idx} onClick={editOpen}/>
                        <img className="delete-icon" src="https://img.icons8.com/fluency-systems-regular/48/000000/filled-trash.png" alt="delete-icon" idx={idx} onClick={eraseSchedule}/>
                      </div>
                      <input className="edit-input hidden" type="time" defaultValue={el.time}/>
                      <div className="schedule-time">{el.time}</div>
                      <div className="hidden">
                        <textarea className="edit-schedule" defaultValue={el.text}/>
                        <div>
                          <button className="modal-button" onClick={edit}>수정</button>
                          <button className="modal-button" onClick={editClose}>취소</button>
                        </div>
                      </div>  
                      <div>{el.text}</div>
                    </div>
          })}
          <div className="diary-blank"></div>
        {/* </div> */}
      </div>
    </div>
    <Nav userinfo={userinfo} page="calendar"/>
    </>
  )
}

export default Calendar;