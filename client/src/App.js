import './App.css';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//필요 페이지 불러오기
import Main from './pages/Main';
import Diary from './pages/Diary';
import Calendar from './pages/Calendar';
import Talk from './pages/Talk';
import Mypage from './pages/Mypage';
import Login from './pages/Login';
import Loading from './components/Loading';
import Kakao from './pages/Kakao';

function App() {
  //상태(state)로 관리하는 데이터 모음
  // const [ isLogin, setIsLogin ] = useState(false);  //로그인 여부는 받아온 유저 정보가 있으면 로그인 // 없으면 로그아웃
  const [ loading, setLoading ] = useState(false);  //로팅 페이지 용도
  const [ userinfo, setUserinfo ] = useState(null); //받아온 유저 정보
  
  



  return (
    <BrowserRouter>
    { loading ? <Loading /> : null }
      <div className="App flex-col a-center j-center">
        <div className="container flex-col a-center j-center">
          <Routes>
            <Route exact path='/' element={ <Main userinfo={userinfo} /> } />
            <Route path='/Diary' element={ <Diary userinfo={userinfo} /> } />
            <Route path='/Calendar' element={ <Calendar userinfo={userinfo} /> } />
            <Route path='/Talk' element={ <Talk userinfo={userinfo} /> } />
            <Route path='/Mypage' element={ <Mypage userinfo={userinfo} /> } />
            <Route path='/Login' element={ <Login userinfo={userinfo} setLoading={setLoading} setUserinfo={setUserinfo} /> } />
            <Route path='/Kakao' element={ <Kakao setLoading={setLoading} setUserinfo={setUserinfo} /> } />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;