import './Diary.css';
import Title from '../components/Title';
import Nav from '../components/Nav';

function Diary({ isLogin }) {

  return (
    <>
    <Title title="일 기 장" />
    <div className="diary-container flex-col a-center">
      <div className="diary">add 버튼 들어갈 공간</div>

      <div className="diary">
        <div>2021년 12월 09일</div>
        <div>일기 제목</div>
        <div className="diary-contents flex j-space-around">
          <div className="diary-img-box flex-col a-center j-space-around">
            <img className="diary-img" src="https://i.ibb.co/mvPpfqY/pngwing-com-1.png" alt="baby Pic"/>
          </div>
          <div className="diary-docs flex-col a-center">
            <div className="diary diary-doc">
              <div>{`<금쪽이 엄마>`}</div>오늘은 어쩌구 저쩌구 했다. 병원 다녀오기도 힘들고 대기시간도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.</div>
            <div className="diary diary-doc">오늘은 어쩌구 저쩌구 했다. 병원 다녀오기도 힘들고 대기시간도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.</div>
            <div className="diary diary-doc">오늘은 어쩌구 저쩌구 했다. 병원 다녀오기도 힘들고 대기시간도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.</div>
            <div className="diary diary-doc">오늘은 어쩌구 저쩌구 했다. 병원 다녀오기도 힘들고 대기시간도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.</div>
            <div className="diary diary-doc">오늘은 어쩌구 저쩌구 했다. 병원 다녀오기도 힘들고 대기시간도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.</div>
            <div className="diary diary-doc">오늘은 어쩌구 저쩌구 했다. 병원 다녀오기도 힘들고 대기시간도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.</div>
            <div className="diary diary-doc">오늘은 어쩌구 저쩌구 했다. 병원 다녀오기도 힘들고 대기시간도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.</div>
            <div className="diary diary-doc">오늘은 어쩌구 저쩌구 했다. 병원 다녀오기도 힘들고 대기시간도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.</div>
            <div className="diary diary-doc">오늘은 어쩌구 저쩌구 했다. 병원 다녀오기도 힘들고 대기시간도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.</div>
            <div className="diary diary-doc">오늘은 어쩌구 저쩌구 했다. 병원 다녀오기도 힘들고 대기시간도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.</div>
            <div className="diary add-post">+</div>
          </div>
        </div>
      </div>
      <div className="diary">일기2</div>
      <div className="diary">
        <div>2021년 12월 09일</div>
        <div>일기 제목</div>
        <div className="diary-contents flex j-space-around">
          <div className="diary-img-box flex-col a-center">
            <img className="diary-img" src="https://i.ibb.co/mvPpfqY/pngwing-com-1.png" alt="baby Pic"/>
          </div>
          <div className="diary-docs flex-col a-center">
            {/* <div className="diary diary-doc">오늘은 어쩌구 저쩌구 했다. 병원 다녀오기도 힘들고 대기시간도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.</div>
            <div className="diary diary-doc">오늘은 어쩌구 저쩌구 했다. 병원 다녀오기도 힘들고 대기시간도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.</div>
            <div className="diary diary-doc">오늘은 어쩌구 저쩌구 했다. 병원 다녀오기도 힘들고 대기시간도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.</div>
            <div className="diary diary-doc">오늘은 어쩌구 저쩌구 했다. 병원 다녀오기도 힘들고 대기시간도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.</div>
            <div className="diary diary-doc">오늘은 어쩌구 저쩌구 했다. 병원 다녀오기도 힘들고 대기시간도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.</div>
            <div className="diary diary-doc">오늘은 어쩌구 저쩌구 했다. 병원 다녀오기도 힘들고 대기시간도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.</div>
            <div className="diary diary-doc">오늘은 어쩌구 저쩌구 했다. 병원 다녀오기도 힘들고 대기시간도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.</div>
            <div className="diary diary-doc">오늘은 어쩌구 저쩌구 했다. 병원 다녀오기도 힘들고 대기시간도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.</div> */}
            <div className="diary add-post">+</div>
          </div>
        </div>
      </div>
    </div>
    <Nav isLogin={isLogin} page="diary"/>
    </>
  )
}

export default Diary;