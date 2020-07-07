import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Join from "./components/Join/Join";
import Main from "./components/Main/Main";
import "./App.css";

// This along with the CSS properly sizes the viewport for devices
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);
const recalculateWindowSize = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};
window.onresize = recalculateWindowSize;

const App = () => {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Join} />
        <Route path="/game" component={Main} />
      </Router>
    </div>
  );
};

export default App;
