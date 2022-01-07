import './TalkPage.css';
import { useRef } from 'react';

function TalkPage ({ talk }) {
  // 날짜
  // const date = talk.createdAt.split("/")

  const talkPost = useRef(null);
  const talkContents = useRef(null);
  const btClose = useRef(null);
  const post = useRef(null);
  const comments = useRef(null);

  // 톡 페이지 열기
  const open = (e) => {
    talkPost.current.classList.add("z-add");
    post.current.classList.remove("mini");
    comments.current.classList.remove("mini");
    btClose.current.classList.remove("hidden");
    talkContents.current.classList.remove("mini");
  }

  // 톡 페이지 닫기
  const close = (e) => {
    talkPost.current.classList.remove("z-add");
    post.current.classList.add("mini");
    comments.current.classList.add("mini");
    btClose.current.classList.add("hidden");
    talkContents.current.classList.add("mini");
    e.stopPropagation()
  }


  return (
    <div ref={talkPost} className="talk-post" onClick={open}>
      <div ref={btClose} className="close hidden" onClick={close}>&lt;</div>
        <div>&lt;금쪽이 엄마&gt; 제목입니당</div>
        <div className="talk-day">2021년 12월 21일 00:00</div>
      <div ref={talkContents} className="talk-contents flex a-center j-space-around mini">
        <div ref={post} className="talk-text flex-col a-center mini">
          여기는 본문 내용
          여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용 여기는 본문 내용
        </div>
        <div ref={comments} className="talk-comments flex-col a-center mini">
          <div className="add-post">+</div>
          여기 댓글 하나씩
          <div className="blank"></div>
        </div>
      </div>
    </div>
  )
}

export default TalkPage;