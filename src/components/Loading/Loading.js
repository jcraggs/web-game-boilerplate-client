import React from "react";
import "./Loading.css";

const Loading = () => (
  <div className="loadingContainer">
    <div class="lds-dual-ring"></div>
    <h1 className="loadingText"> Loading please wait</h1>
  </div>
);

export default Loading;
