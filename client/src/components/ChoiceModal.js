import { useState, useEffect } from "react";

function ChoiceModal ({ choiceRef, func, message }) {

  const [refresh, setRefresh] = useState(null);
  useEffect(()=>{
    setRefresh(null);
  },[ message ])

  const close = (e) => {
    if(e.target.name === "ok" && func) func();
    choiceRef.current.classList.add("hidden");
  }

  return (
    <div ref={choiceRef} className="modal flex a-center j-center hidden">
      <div className="message flex-col a-center j-space-evenly">
        <div>{message}</div>
        <button className="modal-button" name="ok" onClick={close}>확 인</button>
        <button className="modal-button" onClick={close}>취 소</button>
      </div>
    </div>
  )
}

export default ChoiceModal;