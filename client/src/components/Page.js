import './Page.css';

function Page () {

  const open = (e) => {
    if(e.currentTarget.lastChild.classList[3] === "mini") {
      e.currentTarget.classList.add("z-add");
      e.currentTarget.lastChild.classList.remove("mini");
      e.currentTarget.firstChild.classList.remove("hidden");
    }
  }

  const close = (e) => {
    e.currentTarget.classList.add("hidden");
    e.currentTarget.parentElement.lastChild.classList.add("mini");
    e.currentTarget.parentNode.classList.remove("z-add");
    e.stopPropagation()
  }


  return (
    <div className="diary" onClick={open}>
      <div className="close hidden" onClick={close}>&lt;</div>
      <div>2021년 12월 09일</div>
      <div>일기 제목</div>
      <div className="diary-contents flex j-space-around mini">
        <div className="diary-img-box flex-col a-center j-space-around">
          <img className="diary-img" src="https://i.ibb.co/mvPpfqY/pngwing-com-1.png" alt="baby Pic"/>
        </div>
        <div className="diary-docs flex-col a-center">
          <div className="diary add-post">+</div>
          <div className="diary diary-doc">
            <div>{`<금쪽이 엄마>`}</div>오늘은 어1111도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.</div>
          <div className="diary diary-doc">오늘은 어쩌구 저쩌구 했다. 병원 다녀오기도 힘들고 대기시간도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.</div>
          <div className="diary diary-doc">오늘은 어쩌구 저쩌구 했다. 병원 다녀오기도 힘들고 대기시간도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.</div>
          <div className="diary diary-doc">오늘은 어쩌구 저쩌구 했다. 병원 다녀오기도 힘들고 대기시간도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.</div>
          <div className="diary diary-doc">오늘은 어쩌구 저쩌구 했다. 병원 다녀오기도 힘들고 대기시간도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.</div>
          <div className="diary diary-doc">오늘은 어쩌구 저쩌구 했다. 병원 다녀오기도 힘들고 대기시간도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.</div>
          <div className="diary diary-doc">오늘은 어쩌구 저쩌구 했다. 병원 다녀오기도 힘들고 대기시간도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.</div>
          <div className="diary diary-doc">오늘은 어쩌구 저쩌구 했다. 병원 다녀오기도 힘들고 대기시간도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.</div>
          <div className="diary diary-doc">오늘은 어쩌구 저쩌구 했다. 병원 다녀오기도 힘들고 대기시간도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.</div>
          <div className="diary diary-doc">오늘은 어쩌구 저쩌구 했다. 병원 다녀오기도 힘들고 대기시간도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.</div>
          <div className="diary-blank"></div>
        </div>
      </div>
    </div>
  )
}

export default Page;