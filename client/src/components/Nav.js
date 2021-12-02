import './Nav.css';
import { Link } from 'react-router-dom';

function Nav () {

  return (
    <>
    <nav className="nav flex">
      <div className="nav-box flex">
        <Link to="/" className="nav-button flex a-center">
        <img className="nav-icon" src="https://i.ibb.co/4gVrkZ7/2191535-back-home-homepage-house-sleep-icon.png" alt="home icon" />
        </Link>
      </div>
      <div className="nav-box flex">
        <Link to="/Diary" className="nav-button flex a-center">
        <img className="nav-icon" src="https://i.ibb.co/N1F5LCW/3721295-copybook-education-notebook-notes-school-icon.png" alt="diary icon" />
        </Link>
      </div>
      <div className="nav-box flex">
        <Link to="/Calendar" className="nav-button flex a-center">
        <img className="nav-icon" src="https://i.ibb.co/DLh7GgP/5027858-calendar-date-event-schedule-icon2.png" alt="calender icon" />
        </Link>
      </div>
      <div className="nav-box flex">
        <Link to="/Talk" className="nav-button flex a-center">
        <img className="nav-icon" src="https://i.ibb.co/PjMFJBZ/5027855-chat-communication-message-talk-icon.png" alt="talk icon" />
        </Link>
      </div>
      <div className="nav-box flex">
        <Link to="/Mypage" className="nav-button flex a-center">
        <img className="nav-icon" src="https://i.ibb.co/ykxZvqM/2021-11-20-2-03-35.png" alt="mypage icon" />
        </Link>
      </div>
      <div className="nav-box flex">
        <Link to="/Login" className="nav-button flex a-center">
        <img className="nav-icon" src="https://i.ibb.co/KbwthLc/728934-enter-login-right-arrow-forward-icon.png" alt="login icon" />
        </Link>
      </div>
    </nav>
    </>
  )
}

export default Nav;