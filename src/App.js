import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./component/main";
import Upload from './component/upload';


function App(){
  return (
    <div>
      <Router>
        <Route component={Main} path="/" exact={true} />
        <Route component={Upload} path="/upload" />
      </Router>
    </div>
  );
}

export default App;
