import React from 'react';
import Art from "../img/art.png";
import Arrow from "../img/arrow.png";
import "../scss/main.scss";

function Main() {
  return (
    <div className="main">
        <div className="main_banner">
            <img src={Art}/>
        </div>
        <p className='main_title'>
                자신의 그림을 분석해보고<br/>
                결과를 확인해보세요
        </p>
      
        <img src={Arrow} className='arrow'/>
      <button className='start_btn'>분석하기</button>

    </div>
  );
}

export default Main;