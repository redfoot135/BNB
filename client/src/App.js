import './App.css';
import { useState, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';

function App() {

  const [ isLogin, setIsLogin ] = useState(false);  
  
  



  return (
    <BrowserRouter>
      <div className="App flex-col a-center">
        <div className="container">
          {/* <Routes>
            <Route exact path='/'> */}
              <Main isLogin={isLogin} />
            {/* </Route>
          </Routes> */}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;