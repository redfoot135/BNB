import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const { REACT_APP_SERVER } = process.env;

function Kakao({ setLoading, setUserinfo }) {

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true)
    const kakaoCode = new URL(window.location.href).searchParams.get('code')
    axios.post(`${REACT_APP_SERVER}/auth/social`,{kakao: kakaoCode},{ withCredentials: true })
    .then(res => {
      //로그인 성공하면 로그인 여부 변경, 받아온 유저 정보 저장
      // setIsLogin(true);
      setUserinfo(res.data.data);
      //로딩 종료하고 홈으로 이동
      setLoading(false);
      navigate("/");
    })
    .catch(err => {
      //Do it//
      setLoading(false);
      navigate("/Login");
    })
  }, [])

  return (
    <>
    </>
  )
}

export default Kakao;