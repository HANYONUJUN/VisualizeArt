import React from 'react';
import Main from "./component/main.tsx";
import Upload from './component/upload.tsx';
// 버전이 바뀌면서 BrowserRouter대신 Router, Routes, Route를 시용
// 라우팅을 보다 선언적으로 만들기 위한 것
// 라우팅 구조를 코드를 통해 명확하게 확인할 수 있도록 하기 위한 것
// 코드의 가독성을 높이고 라우팅의 에러를 줄이는데 도움이 됨
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 


function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/upload" element={<Upload/>} />
      </Routes>
    </Router>
  );
}

export default App;
