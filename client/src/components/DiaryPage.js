import './Page.css';

function Page ({ diary }) {
  // 날짜
  const date = diary.createdAt.split("/")

  // 일기 페이지 열기
  const open = (e) => {
      e.currentTarget.classList.add("z-add");
      e.currentTarget.lastChild.classList.remove("mini");
      e.currentTarget.firstChild.classList.remove("hidden");
  }

  // 일기 페이지 닫기
  const close = (e) => {
    e.currentTarget.classList.add("hidden");
    e.currentTarget.parentElement.lastChild.classList.add("mini");
    e.currentTarget.parentNode.classList.remove("z-add");
    e.stopPropagation()
  }


  return (
    <div className="diary" onClick={open}>
      <div className="close hidden" onClick={close}>&lt;</div>
      <div>{date[2]}년 {date[0]}월 {date[1]}일</div>
      <div>{diary.title}</div>
      <div className="diary-contents flex j-space-around mini">
        <div className="diary-img-box flex-col a-center j-space-around">
          {diary.pictures[0] ? diary.pictures.map(el => <img className="diary-img" src={el.url} alt="baby Pic" />) : <img className="diary-img" src="https://i.ibb.co/mvPpfqY/pngwing-com-1.png" alt="baby Pic" /> }
        </div>
        <div className="diary-docs flex-col a-center">
          <div className="diary add-post">+</div>
          {diary.diary_comment.map(el => <div className="diary diary-doc"><div>&lt;{el.writer}&gt;</div>{el.comment}</div>)}
          <div className="diary-blank"></div>
        </div>
      </div>
    </div>
  )
}

export default Page;