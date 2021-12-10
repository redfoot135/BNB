import './Comment.css';

function Comment ({comments}) {

  return (
    <div className="comment-container flex-col a-center">
      {comments.length !== 0 ? comments.map(el => {
        <div className="comment">
          <div>{`<금쪽이 엄마>`}</div>오늘은 어쩌구 저쩌구 했다. 병원 다녀오기도 힘들고 대기시간도 길고 코로나도 걱정이고 걱정걱정걱정 투성이다.
        </div>
      })
      : <div>아무것도 없어요</div>}
      <div className="add-comment">+</div>
    </div>
  )
}

export default Comment;