import React from "react";
import xIcon from "../../icons/xIcon.png";
import "./BurgerMenu.css";
import MenuItem from "./MenuItem";

const BurgerMenu = ({ burgerMenuBool, toggleBurgerMenu }) => (
  <div className={burgerMenuBool ? "menuContainer" : "hiddenBM"}>
    <div className="titleBar">
      <div className="xIcon"></div>
      <p className="menuTitle">Game Information</p>
      <img
        className="xIcon"
        src={xIcon}
        alt="exit menu"
        onClick={() => toggleBurgerMenu(burgerMenuBool)}
      />
    </div>
    <div className="menuContent">
      <MenuItem title={"Current Players"} content={"test"}></MenuItem>
      <MenuItem title={"How to play"} content={"test"}></MenuItem>
      <MenuItem title={"Game Rules"} content={"test"}></MenuItem>
    </div>
  </div>
);

export default BurgerMenu;
