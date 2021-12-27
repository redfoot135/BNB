import './Mypage.css';
import Title from '../components/Title';
import Nav from '../components/Nav';
import axios from 'axios';
const { REACT_APP_SERVER } = process.env;

function Mypage({ userinfo }) {

  const logout = () => {
    axios.post(`${REACT_APP_SERVER}/auth/logout`)
    .then(res => console.log(res))
  }

  return (
    <>
    <Title title="내 정 보" />
    <div className="Mypage-pages" >
      <div >add 버튼 들어갈 공간</div>
      <button type="button" onClick={logout}>로그아웃</button>
      <div>일기1</div>
      <div>일기2</div>
      <div>일기3</div>
    </div>
    <Nav userinfo={userinfo} page="mypage"/>
    </>
  )
}

export default Mypage;