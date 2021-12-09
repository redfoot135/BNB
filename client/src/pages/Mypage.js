import './Mypage.css';
import Title from '../components/Title';
import Nav from '../components/Nav';

function Mypage({ isLogin }) {

  return (
    <>
    <Title title="내 정 보" />
    <div className="Mypage-pages" >
      <div>add 버튼 들어갈 공간</div>
      <div>일기1</div>
      <div>일기2</div>
      <div>일기3</div>
    </div>
    <Nav isLogin={isLogin} page="mypage"/>
    </>
  )
}

export default Mypage;