import './Nav.css';
import { Link } from 'react-router-dom';
import buttonInfo from '../buttonInfo'

function Nav ({ userinfo, page }) {

  return (
    <nav className="nav flex j-center">
      {buttonInfo.filter(el => !(el.name === page || (userinfo && el.name === "login"))).map(el => {
        return <div className="nav-box flex j-center a-center" key={el.name}>
          <Link to={el.link} className="nav-button flex a-center j-center">
          <img className="nav-icon" src={el.src} alt={el.name + " icon"} />
          </Link>
        </div>
      })}
    </nav>
  )
}

export default Nav;