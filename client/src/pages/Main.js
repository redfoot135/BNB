import './Main.css';
import Title from '../components/Title';
import { Link } from 'react-router-dom';

function Main({ isLogin }) {
  
  
  return (
    <>
    <Title title="Beautiful New Baby" />

    <div className="carousel-title">금쪽이 12주 3일 D-000</div>
    <div className="carousel flex j-space-between">
      <div className="carousel-button-box flex-col j-center">
        <img className="carousel-button" src="https://i.ibb.co/CvV3LkZ/round-chevron-left-black-48dp.png" alt="button img"></img>
      </div>
      <div className="carousel-inner">
        <img className="baby-img" src="https://i.ibb.co/mvPpfqY/pngwing-com-1.png" alt="baby Pic"/>
      </div>
      <div className="carousel-button-box flex-col j-center">
        <img className="carousel-button" src="https://i.ibb.co/3CLktTM/round-navigate-next-black-48dp.png" alt="button img"></img>
      </div>
    </div>

    <div className="button-box flex j-space-between">
      <Link to="/Diary" className="menu-button flex-col a-center j-center">
        <img className="menu-icon" src="https://i.ibb.co/N1F5LCW/3721295-copybook-education-notebook-notes-school-icon.png" alt="diary icon" />
        <div className="menu-text">일기장</div>
      </Link>
      <Link to="/Calendar" className="menu-button flex-col a-center j-center">
        <img className="menu-icon" src="https://i.ibb.co/DLh7GgP/5027858-calendar-date-event-schedule-icon2.png" alt="calender icon" />
        <div className="menu-text">일정표</div>
      </Link>
      <Link to="/Talk" className="menu-button flex-col a-center j-center">
        <img className="menu-icon" src="https://i.ibb.co/PjMFJBZ/5027855-chat-communication-message-talk-icon.png" alt="talk icon" />
        <div className="menu-text">엄마톡</div>
      </Link>
      {isLogin ?
        <Link to="/Mypage" className="menu-button flex-col a-center j-center">
          <img className="menu-icon" src="https://i.ibb.co/ykxZvqM/2021-11-20-2-03-35.png" alt="mypage icon" />
          <div className="menu-text">내정보</div>
        </Link> :
        <Link to="/Login" className="menu-button flex-col a-center j-center">
          <img className="menu-icon" src="https://i.ibb.co/KbwthLc/728934-enter-login-right-arrow-forward-icon.png" alt="login icon" />
          <div className="menu-text">로그인</div>
        </Link>
      }
    </div>
    
    </>
  )
}

export default Main;