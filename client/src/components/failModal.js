function FailModal ({ failRef }) {


  const failClose = () => {
    failRef.current.classList.add("hidden");
  }

  return (
    <div ref={failRef} className="modal flex a-center j-center hidden">
      <div className="message flex-col a-center j-space-evenly">
        <div>다시 시도해주세요.</div>
        <button className="modal-button" onClick={failClose}>확 인</button>
      </div>
    </div>
  )
}

export default FailModal;