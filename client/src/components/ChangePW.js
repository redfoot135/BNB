function ChangePW ({ changeRef , func, message }) {

  const changeClose = () => {
    changeRef.current.classList.add("hidden");
    if(func) func();
  }

  return (
    <div ref={ changeRef } className="modal flex a-center j-center hidden">
        <div>{ message }</div>
      <input ref={inputRef} className="check-input" type="password" autoComplete="false"/>
      <input ref={inputRef} className="check-input" type="password" autoComplete="false"/>
      <div className="message flex-col a-center j-space-evenly">
        <button className="modal-button" onClick={changeClose}>확 인</button>
      </div>
    </div>
  )
}

export default ChangePW;