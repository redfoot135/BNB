import './Title.css';

function Title ({ title }) {


  return (
    <>
      <div className="title flex j-center">
        <div className="flex">{title}</div>
      </div>
    </>
  )
}

export default Title;