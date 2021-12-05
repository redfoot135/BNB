import './Diary.css';
import Title from '../components/Title';
import Nav from '../components/Nav';

function Diary({ isLogin }) {

  return (
    <>
    <Title title="일 기 장" />
    <div className="diary-pages" >
      <div>add 버튼 들어갈 공간</div>
      <div>일기1</div>
      <div>일기2</div>
      <div>일기3</div>
    </div>
    <Nav isLogin={isLogin} page="diary"/>
    </>
  )
}

export default Diary;