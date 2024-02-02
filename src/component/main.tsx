import React from 'react';
import Art from "../img/art.png";
import "../scss/main.scss";

function Main() {
  return (
    <div className="main">
        <div className="main_banner">
            <img src={Art}/>
            <p>
                자신의 그림을 분석해보고<br/>
                결과를 확인해보세요
            </p>
        </div>
    </div>
  );
}

export default Main;