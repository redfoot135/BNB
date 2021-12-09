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
  const [ isLogin, setIsLogin ] = useState(false);  //로그인 여부
  const [ loading, setLoading ] = useState(false);  //로팅 페이지 용도
  const [ userinfo, setUserinfo ] = useState(null); //받아온 유저 정보
  
  



  return (
    <BrowserRouter>
    { loading ? <Loading /> : null }
      <div className="App flex-col a-center">
        <div className="container flex-col">
          <Routes>
            <Route exact path='/' element={ <Main isLogin={isLogin} /> } />
            <Route path='/Diary' element={ <Diary isLogin={isLogin} /> } />
            <Route path='/Calendar' element={ <Calendar isLogin={isLogin} /> } />
            <Route path='/Talk' element={ <Talk isLogin={isLogin} /> } />
            <Route path='/Mypage' element={ <Mypage isLogin={isLogin} /> } />
            <Route path='/Login' element={ <Login isLogin={isLogin} setIsLogin={setIsLogin} setLoading={setLoading} setUserinfo={setUserinfo} /> } />
            <Route path='/Kakao' element={ <Kakao setIsLogin={setIsLogin} setLoading={setLoading} setUserinfo={setUserinfo} /> } />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;