import { useRef, useState } from 'react';
import './DiaryPage.css';
import { v4 } from 'uuid';
import ChoiceModal from './ChoiceModal';
import CheckModal from './CheckModal';
import axios from 'axios';
const { REACT_APP_SERVER } = process.env;

function DiaryPage ({ userinfo, data }) {
  
  const [ diary, setDiary ] = useState(data);
  const [ comments, setComments ] = useState(diary.diary_comment);
  const [ message, setMessage ] = useState("");
  const [ isTrue, setIsTrue ] = useState(true);
  
  const date = diary.date.split("-");
  const diaryPage = useRef(null);
  const diaryContents = useRef(null);
  const btClose = useRef(null);
  const pics = useRef(null);
  const commentsRef = useRef(null);
  const addPost = useRef(null);
  const addInput = useRef(null);
  const btBox = useRef(null);
  const checkRef = useRef(null);
  const choiceRef1 = useRef(null);
  const choiceRef2 = useRef(null);
  const choiceRef3 = useRef(null);
  const choiceRef4 = useRef(null);
  const choiceRef5 = useRef(null);
  const choiceRef6 = useRef(null);
  const idx = useRef(null);
  const comment = useRef(null);
  
  // 일기 페이지 열기
  const open = (e) => {
    if(e.target === e.currentTarget) {
      diaryPage.current.classList.add("z-add");
      btClose.current.classList.remove("hidden");
      diaryContents.current.classList.remove("mini");
      pics.current.classList.remove("mini");
      commentsRef.current.classList.remove("mini")
    }
  }

  // 일기 페이지 닫기
  const close = (e) => {
    diaryPage.current.classList.remove("z-add");
    btClose.current.classList.add("hidden");
    diaryContents.current.classList.add("mini");
    pics.current.classList.add("mini");
    commentsRef.current.classList.add("mini")
    addClose();
    reset();
    e.stopPropagation();
  }

  const addOpen = () => {
    addPost.current.classList.add("add-open");
    addInput.current.classList.remove("hidden");
    btBox.current.classList.remove("hidden");
    addInput.current.focus();
  }

  const addClose = (e) => {
    addPost.current.classList.remove("add-open");
    addInput.current.classList.add("hidden");
    btBox.current.classList.add("hidden");
    if(e) e.stopPropagation();
  }

  const addReset = () => {
    choiceRef1.current.classList.remove("hidden");
  }
  
  const reset = () => {
    addInput.current.value = "";
    addInput.current.focus();
  }

  const addDiary = () => {
    choiceRef2.current.classList.remove("hidden");

  }

  const submit = () => {
    axios.post(`${REACT_APP_SERVER}/diary/comment`,
      {
        id: diary.id,
        comment: addInput.current.value
      }, {
        headers: {
          authorization: `Bearer ${userinfo.accessToken}`
        }
      }
    )
    .then(res => {
      reset();
      addClose();
      setComments([res.data.data, ...comments]);
    })
    .catch(err => {
      checkRef.current.classList.remove("hidden");
    })
  }

  const diaryEditOpen = (e) => {
    diaryPage.current.children[2].classList.add("hidden");
    diaryPage.current.children[4].classList.add("hidden");
    diaryPage.current.children[3].classList.remove("hidden");
    diaryPage.current.children[5].classList.remove("hidden");
    diaryPage.current.children[6].classList.remove("hidden");
    diaryPage.current.children[7].classList.remove("hidden");


    e.stopPropagation();
  }

  const diaryEditClose = (e) => {
    diaryPage.current.children[2].classList.remove("hidden");
    diaryPage.current.children[4].classList.remove("hidden");
    diaryPage.current.children[3].classList.add("hidden");
    diaryPage.current.children[5].classList.add("hidden");
    diaryPage.current.children[6].classList.add("hidden");
    diaryPage.current.children[7].classList.add("hidden");

    diaryPage.current.children[3].firstChild.value = diary.date;
    diaryPage.current.children[5].value = diary.title;
    e.stopPropagation();
  }
  
  const diaryEdit = () => {
    choiceRef3.current.classList.remove("hidden");
  }

  const diaryEditSubmit = () => {
    axios.patch(`${REACT_APP_SERVER}/diary`,
      {
        id: diary.id,
        date: diaryPage.current.children[3].firstChild.value,
        title: diaryPage.current.children[5].value
      }, {
        headers: {
          authorization: `Bearer ${userinfo.accessToken}`
        }
      }
    )
    .then(res => {
      const { date, title } = res.data.data;
      setDiary({...diary, date, title});
      setMessage("수정되었습니다")
      checkRef.current.classList.remove("hidden");
      diaryEditClose();
    })
    .catch(err => {
      !err.response ? setMessage("서버 연결이 끊어졌습니다") : setMessage("다시 시도해주세요");
      checkRef.current.classList.remove("hidden");
    })
  }

  const diaryDeleteOpen = () => {
    choiceRef4.current.classList.remove("hidden");
  }

  const diaryDelete = () => {
    axios.delete(`${REACT_APP_SERVER}/diary?id=${diary.id}`,
      {
        headers: {
          authorization: `Bearer ${userinfo.accessToken}`
        }
      }
    )
    .then(res => {
      console.log(res.data);
      setIsTrue(false);
    })
  }

  const commentEditOpen = (e) => {
    e.target.parentNode.parentNode.children[3].classList.remove("hidden");
    e.target.parentNode.parentNode.children[2].classList.add("hidden");
    e.target.parentNode.parentNode.children[4].classList.remove("hidden");
  }
  
  const commentEditClose = (e) => {
    e.target.parentNode.parentNode.children[3].classList.add("hidden");
    e.target.parentNode.parentNode.children[2].classList.remove("hidden");
    e.target.parentNode.parentNode.children[4].classList.add("hidden");
    e.target.parentNode.parentNode.children[3].value = e.target.parentNode.parentNode.children[2].innerHTML;
  }
  
  const commentEdit = (e) => {
    choiceRef5.current.classList.remove("hidden");
    idx.current = e.target.attributes.idx.value;
    comment.current = e.target.parentNode.parentNode.children[3].value;
  }

  const commentEditSubmit = () => {
    axios.patch(`${REACT_APP_SERVER}/diary/comment`,
    {
      id: comments[idx.current].id,
      comment: comment.current
    },
    {
      headers: {
        authorization: `Bearer ${userinfo.accessToken}`
      }
    })
    .then(res => {
      const next = [...comments];
      next[idx.current].comment = comment.current;
      setComments(next);
      setMessage("완료했습니다")
      checkRef.current.classList.remove("hidden")
    })
    .catch(err => {
      !err.response ? setMessage("서버 연결이 끊어졌습니다") : setMessage("다시 시도해주세요");
      checkRef.current.classList.remove("hidden")
    })
  }
 
  const commentDelete = (e) => {
    idx.current = e.target.attributes.idx.value;
    choiceRef6.current.classList.remove("hidden");
  }

  const commentDeleteSubmit = () => {
    axios.delete(`${REACT_APP_SERVER}/diary/comment?id=${comments[idx.current].id}`,
    {
      headers: {
        authorization: `Bearer ${userinfo.accessToken}`
      }
    })
    .then(res => {
      const next = [...comments.slice(0, idx.current), ...comments.slice(idx.current+1)];
      setComments(next);
      setMessage("삭제했습니다")
      checkRef.current.classList.remove("hidden");
    })
    .catch(err => {
      console.log(err)
    })
  }

  const test = () => {
    setMessage("개발중입니다")
    checkRef.current.classList.remove("hidden");
  }


  return (
    !isTrue ? <></> :
    <>
      <CheckModal checkRef={checkRef} func={null} message={message}/>
      {/* 코멘트 추가 */}
      <ChoiceModal choiceRef={choiceRef1} func={reset} message="새로고침 하시겠습니까?"/>
      <ChoiceModal choiceRef={choiceRef2} func={submit} message="등록합니다"/>
      {/* 일기 수정, 삭제 */}
      <ChoiceModal choiceRef={choiceRef3} func={diaryEditSubmit} message="수정합니다"/>
      <ChoiceModal choiceRef={choiceRef4} func={diaryDelete} message="일기를 삭제합니다"/>
      {/* 코멘트 수정 삭제 */}
      <ChoiceModal choiceRef={choiceRef5} func={commentEditSubmit} message="수정합니다"/>
      <ChoiceModal choiceRef={choiceRef6} func={commentDeleteSubmit} message="삭제합니다"/>

      <div ref={diaryPage} className="diary">
        <div className="delete">
          <img className="delete-icon" src="https://i.ibb.co/drz8k6J/iconmonstr-edit-11-32.png" alt="edit-icon" onClick={diaryEditOpen}/>
          <img className="delete-icon" src="https://img.icons8.com/fluency-systems-regular/48/000000/filled-trash.png" alt="delete-icon" onClick={diaryDeleteOpen}/>
        </div>
        <div ref={btClose} className="close hidden" onClick={close}>&lt;</div>
        <div onClick={open}>{date[0]}년 {date[1]}월 {date[2]}일</div>
        <div className="hidden">
          <input type="date" className="edit-input" defaultValue={diary.date}/>
        </div>
        <div onClick={open}>{diary.title}</div>
        <input text="text" className="edit-input edit-diary-title hidden" defaultValue={diary.title}/>
        <button type="button" className="modal-button hidden" onClick={diaryEdit}>수정</button>
        <button type="button" className="modal-button hidden" onClick={diaryEditClose}>취소</button>
        <div ref={diaryContents} className="diary-contents flex j-space-around mini">
          <div ref={pics} className="diary-img-box flex-col a-center  mini">
            <div className="delete">
              <img className="delete-icon" src="https://i.ibb.co/7Cy21nK/iconmonstr-plus-6-240.png" alt="edit-icon" onClick={test}/>
              <img className="delete-icon" src="https://i.ibb.co/drz8k6J/iconmonstr-edit-11-32.png" alt="edit-icon" onClick={test}/>
              <img className="delete-icon" src="https://img.icons8.com/fluency-systems-regular/48/000000/filled-trash.png" alt="delete-icon" onClick={test}/>
            </div> 
            {diary.pictures[0] 
            ? diary.pictures.map(el => el.url ? <img className="diary-img" src={el.url} alt="baby Pic" key={v4()}/> : <img className="diary-img" src="https://i.ibb.co/mvPpfqY/pngwing-com-1.png" alt="baby Pic" key={v4()}/>)
            : <img className="diary-img" src="https://i.ibb.co/mvPpfqY/pngwing-com-1.png" alt="baby Pic" /> }
          </div>
          <div ref={commentsRef} className="diary-docs flex-col a-center mini">
            <div ref={addPost} className="add-post flex-col a-center" onClick={addOpen}>
              +
              <textarea ref={addInput} className="add-text hidden" placeholder="일기를 적어보세요"/>
              <div ref={btBox} className="flex hidden">
                <button type="button" className="modal-button" onClick={addClose}>취소하기</button>
                <button type="button" className="modal-button" onClick={addReset}>새로고침</button>
                <button type="button" className="modal-button" onClick={addDiary}>작성하기</button>
              </div>
            </div>
            {comments.map((el, idx) => {
              return  <div className="diary diary-doc" key={v4()}>
                        <div className="delete">
                          <img className="delete-icon" src="https://i.ibb.co/drz8k6J/iconmonstr-edit-11-32.png" alt="edit-icon" onClick={commentEditOpen}/>
                          <img className="delete-icon" src="https://img.icons8.com/fluency-systems-regular/48/000000/filled-trash.png" alt="delete-icon" idx={idx} onClick={commentDelete}/>
                        </div>
                        <div>&lt;{el.user.name}&gt;</div>
                        <div>{el.comment}</div>
                        <textarea class="edit-schedule hidden" defaultValue={el.comment}/>
                        <div className="hidden">
                          <button type="button" className="modal-button" onClick={commentEdit} idx={idx}>수정</button>
                          <button type="button" className="modal-button" onClick={commentEditClose}>취소</button>
                        </div>
                      </div>
            })}
            <div className="diary-blank"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DiaryPage;