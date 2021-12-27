import './Talk.css';
import Title from '../components/Title';
import Nav from '../components/Nav';

function Talk({ userinfo }) {

  return (
    <>
    <Title title="엄 마 톡" />
    <div className="Talk-pages" >
      <div>add 버튼 들어갈 공간</div>
      <div>일기1</div>
      <div>일기2</div>
      <div>일기3</div>
    </div>
    <Nav userinfo={userinfo} page="talk"/>
    </>
  )
}

export default Talk;