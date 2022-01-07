import './Diary.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import AWS from "aws-sdk";
import { v4 } from 'uuid';
import Title from '../components/Title';
import Nav from '../components/Nav';
import DiaryPage from '../components/DiaryPage';
import LoginReqModal from '../components/LoginReqModal';
import FailModal from '../components/FailModal';
const { REACT_APP_SERVER, REACT_APP_ACCESSKEY, REACT_APP_SECRETKEY, REACT_APP_BUCKET } = process.env;

function Diary({ userinfo, setLoading }) {

  const [change, setChange] = useState(0);
  const [diaries, setDiaries] = useState(null);
  const [file, setFile] = useState(null);
  const imgRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const resetRef = useRef(null);
  const submitRef = useRef(null);
  const submitRef2 = useRef(null);
  const successRef = useRef(null);
  const fileRef = useRef(null);
  const formRef = useRef(null);
  const addRef = useRef(null);
  const failRef = useRef(null);
  const loginRef = useRef(null);

  useEffect(()=> {
    // 로그인 되어 있을 때만 데이터 받아오기
    if(userinfo) {
      axios.get(`${REACT_APP_SERVER}/diary`, {
        headers: {
          authorization: `Bearer ${userinfo.accessToken}`
        }
      })
      .then(res => {
        // 다이어리 데이터 상태로 만들어주기
        setDiaries(res.data);
      })
      .catch(data => {
        // 액세스 토큰이 만료된 것이면
        if(data.response && data.response.data.err === "Token has expired") {
          // 엑세스 토큰 재발급 요청
          
        }
      })
    }
  },[change, userinfo]);

  // 선택 사진 띄우는 함수
  const setImg = (e) => {
    if(e.currentTarget.files[0]) {
      const file = e.currentTarget.files[0];
      imgRef.current.src = URL.createObjectURL(file);
      setFile(file);
    }else {
      imgRef.current.src = "";
      setFile(null);
    }
  }

  // 리셋 모달 함수
  const resetModal = () => {
    resetRef.current.classList.remove("hidden");
  }
  // 리셋 실행 함수
  const resetExecution = () => {
    titleRef.current.value = "";
    textRef.current.value = "";
    imgRef.current.src = "";
    fileRef.current.value = "";
    setFile(null);
    resetRef.current.classList.add("hidden");
  }

  // 리셋 취소 함수
  const resetCancel = () => {
    resetRef.current.classList.add("hidden");
  }



  // 일기작성 모달 함수
  const submitModal = () => {
    if(!titleRef.current.value) return titleRef.current.focus();
    if(!textRef.current.value) return textRef.current.focus();
    if(!fileRef.current.value) return submitRef2.current.classList.remove("hidden");
    submitRef.current.classList.remove("hidden");
  }



  // 일기작성 실행 함수
  const submitExecution = () => {
    // 로그인 안되어 있으면 로그인 요청
    if(!userinfo) {
      loginRef.current.classList.remove("hidden");
      submitRef.current.classList.add("hidden");
      submitRef2.current.classList.add("hidden");
      return;
    }
    // 로딩 시작
    setLoading(true);
    // 사진 없이 일기 작성
    if(!fileRef.current.value) {
      // 바로 post 요청 보내기
      axios.post(`${REACT_APP_SERVER}/diary`, {
        title: titleRef.current.value,
        comment: textRef.current.value
      },{
        headers: {
          authorization: `Bearer ${userinfo.accessToken}`
        }
      })
      .then(res => {
        setLoading(false);
        successRef.current.classList.remove("hidden");
        submitRef2.current.classList.add("hidden");
      })
      .catch(err => {
        setLoading(false);
        submitRef.current.classList.add("hidden");
        submitRef2.current.classList.add("hidden");
        failRef.current.classList.remove("hidden");
      })
      return;
    }
    submitRef.current.classList.add("hidden");
    // 사진 파일 버킷 업로드
    // aws 버킷 설정
    const S3 = new AWS.S3({
      region: 'ap-northeast-2',
      accessKeyId: REACT_APP_ACCESSKEY,
      secretAccessKey: REACT_APP_SECRETKEY,
    });
    // 업로드할 랜덤 파일 이름
    const imgName = v4();
    // 사진 업로드
    S3.upload({
      Bucket: REACT_APP_BUCKET,
      Key: `${imgName}.${file.name.split(".")[1]}`,
      // ACL: 'public-read',
      Body: file,
      ContentType: `${file.type}`,
    }, (err, data) => {
      if (err) {
        setLoading(false);
        failRef.current.classList.remove("hidden");
      }else {
        axios.post(`${REACT_APP_SERVER}/diary`, {
          title: titleRef.current.value,
          comment: textRef.current.value,
          url: data.Location,
          date: `${new Date().getFullYear()}-${Number(new Date().getMonth())+1}-${Number(new Date().getDate())}`
          // date: `${new Date().getFullYear()}-${Number(new Date().getMonth()) < 9 ? "0" + (Number(new Date().getMonth())+1) : (Number(new Date().getMonth())+1)}-${Number(new Date().getDate()) < 10 ? ("0" + Number(new Date().getDate())) : Number(new Date().getDate())}`
        }, {
          headers: {
            authorization: `Bearer ${userinfo.accessToken}`
          }
        })
        .then(res => {
          setLoading(false);
          successRef.current.classList.remove("hidden");
        })
        .catch(err => {
          setLoading(false);
          failRef.current.classList.remove("hidden");
        })
      }
    })
  }



  // 일기작성 취소 함수
  const submitCancel = () => {
    submitRef.current.classList.add("hidden");
    submitRef2.current.classList.add("hidden");
  }



  // 성공 모달 닫기
  const successClose = () => {
    successRef.current.classList.add("hidden");
    formRef.current.classList.add("hidden");
    addRef.current.classList.remove("z-add");
    setChange(change+1)
    resetExecution();
  }


  // 일기 작성 페이지 열기
  const open = () => {
    addRef.current.classList.add("z-add");
    formRef.current.classList.remove("hidden");
  }

  // 일기 작성 페이지 닫기
  const close = (e) => {
    formRef.current.classList.add("hidden");
    addRef.current.classList.remove("z-add");
    e.stopPropagation()
  }
  
  return (
    <>
    {/* 새로고침 모달 */}
    <div ref={resetRef} className="modal flex a-center j-center hidden">
      <div className="message flex-col a-center j-space-evenly">
        <div>새로고침 하시겠습니까?</div>
        <button className="modal-button" onClick={resetExecution}>예</button>
        <button className="modal-button" onClick={resetCancel}>아니오</button>
      </div>
    </div>

    {/* 작성하기 모달 */}
    <div ref={submitRef} className="modal flex a-center j-center hidden">
      <div className="message flex-col a-center j-space-evenly">
        <div>일기를 작성합니다.</div>
        <button className="modal-button" onClick={submitExecution}>예</button>
        <button className="modal-button" onClick={submitCancel}>아니오</button>
      </div>
    </div>

    {/* 작성하기 모달2 */}
    <div ref={submitRef2} className="modal flex a-center j-center hidden">
      <div className="message flex-col a-center j-space-evenly">
        <div>사진 없이 작성합니다.</div>
        <button className="modal-button" onClick={submitExecution}>예</button>
        <button className="modal-button" onClick={submitCancel}>아니오</button>
      </div>
    </div>

    {/* 선택 모달 */}
    {/* <ChoiceModal /> */}

    {/* 로그인 요청 모달 */}
    <LoginReqModal loginRef={loginRef} />

    {/* 성공 모달 */}
    <div ref={successRef} className="modal flex a-center j-center hidden">
      <div className="message flex-col a-center j-space-evenly">
        <div>완료했습니다.</div>
        <button className="modal-button" onClick={successClose}>확 인</button>
      </div>
    </div>

    {/* 실패 모달 */}
    <FailModal failRef={failRef}/>

    {/* 페이지 내용 */}
    <Title title="일 기 장" />
    <div className="diary-container flex-col a-center">
      <div ref={addRef} className="diary flex-col" onClick={open}>
        <div className="flex a-center j-center">
          일기 추가<img className="add-img" src='https://i.ibb.co/xm5S6Rg/3669292-playlist-add-ic-icon.png' alt="add-page"/>
        </div>
        <form ref={formRef} className="add-diary flex-col a-center hidden">
          <input ref={titleRef} type="text" className="add-title" placeholder="제목을 입력해 주세요"></input>
          <img ref={imgRef} className="fileImg" alt=""/>
          <label className="addFile" htmlFor="addFile">파일을 선택해주세요</label>
          <input ref={fileRef} id="addFile" className="hidden" type="file" accept="image/*" onChange={ setImg }></input>
          <textarea ref={textRef} className="add-text" placeholder="일기를 적어보세요"></textarea>
          <div className="flex">
            <button type="button" className="modal-button" onClick={close}>취소하기</button>
            <button type="button" className="modal-button" onClick={resetModal}>새로고침</button>
            <button type="button" className="modal-button" onClick={submitModal}>작성하기</button>
          </div>
        </form>
      </div>
      {/* 다이어리 데이터가 있으면 나열 , 없으면 아무것도 없다는 이미지 표시 */}
      {diaries ? diaries.map((el, idx) => <DiaryPage userinfo={userinfo} data={el} key={v4()}/>) : null}
    </div>
    <Nav userinfo={userinfo} page="diary"/>
    </>
  )
}

export default Diary;