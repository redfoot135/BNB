import './Loading.css';

function Loading () {

  return (
    <div className="loading-container flex-col a-center j-center">
      <div className="loading-box flex-col a-center j-center">
        {/* <div className="loading-title">BNB</div> */}
        <img className="loading-img" src="https://i.ibb.co/mvPpfqY/pngwing-com-1.png" alt="loading img" />
        <div className="loading-title-sub">Loading <span className="dot1">.</span> <span className="dot2">.</span> <span className="dot3">.</span></div>
      </div>
    </div>
  )
}

export default Loading;