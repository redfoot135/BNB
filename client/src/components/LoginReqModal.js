import { useNavigate } from "react-router-dom";

function LoginReqModal ({ loginRef }) {

  const navigate = useNavigate();

  const loginClose = () => {
    navigate("/Login")
  }

  return (
    <div ref={loginRef} className="modal flex a-center j-center hidden">
      <div className="message flex-col a-center j-space-evenly">
        <div>로그인 후 이용 가능합니다.</div>
        <button className="modal-button" onClick={loginClose}>로그인</button>
      </div>
    </div>
  )
}

export default LoginReqModal;