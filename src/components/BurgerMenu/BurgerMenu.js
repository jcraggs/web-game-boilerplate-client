import React from "react";
import xIcon from "../../icons/xIcon.png";
import "./BurgerMenu.css";
import MenuItem from "./MenuItem";
import OnlineUsers from "./MenuContent/OnlineUsers/OnlineUsers";
import HowToPlay from "./MenuContent/HowToPlay/HowToPlay";
import ControlList from "./MenuContent/ControlList/ControlList";

const BurgerMenu = ({ burgerMenuBool, toggleBurgerMenu, users }) => (
  <div className={burgerMenuBool ? "menuContainer" : "hiddenBM"}>
    <div
      className="menuShim"
      onClick={() => toggleBurgerMenu(burgerMenuBool)}
    ></div>
    <div className="menuContentContainer">
      <div
        className="titleBar"
        onClick={() => toggleBurgerMenu(burgerMenuBool)}
      >
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
        <MenuItem
          title={"Current Players"}
          content={<OnlineUsers users={users} />}
        ></MenuItem>
        <MenuItem title={"How to play"} content={<HowToPlay />}></MenuItem>
        <MenuItem title={"Controls"} content={<ControlList />}></MenuItem>
      </div>
    </div>
  </div>
);

export default BurgerMenu;
