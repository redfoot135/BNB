function CheckModal ({ checkRef , func, message }) {

  const checkClose = () => {
    checkRef.current.classList.add("hidden");
    if(func) func();
  }

  return (
    <div ref={ checkRef } className="modal flex a-center j-center hidden">
      <div className="message flex-col a-center j-space-evenly">
        <div>{ message }</div>
        <button className="modal-button" onClick={checkClose}>확 인</button>
      </div>
    </div>
  )
}

export default CheckModal;