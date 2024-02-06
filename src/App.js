import React from 'react';
import Main from "./component/main.tsx";
import Upload from './component/upload.tsx';
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
