import './Calendar.css';
import Title from '../components/Title';
import Nav from '../components/Nav';

function Calendar({ userinfo }) {

  return (
    <>
    <Title title="일 정 표" />
    <div className="Calendar-pages" >
      <div>add 버튼 들어갈 공간</div>
      <div>일기1</div>
      <div>일기2</div>
      <div>일기3</div>
    </div>
    <Nav userinfo={userinfo} page="calendar"/>
    </>
  )
}

export default Calendar;