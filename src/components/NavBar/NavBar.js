import React from "react";
import "./Navbar.css";
import burgerIcon from "../../icons/burgerMenu.png";
import backArrow from "../../icons/backArrow.png";

const NavBar = ({ burgerMenuBool, toggleBurgerMenu }) => (
  <div className="navBarContainer">
    <a className="backArrow" href="/">
      <img className="backArrow" src={backArrow} alt="leave page" />
    </a>

    <p className="gameTitle">Game Title</p>
    <img
      className="burgerIcon"
      src={burgerIcon}
      alt="burger menu"
      onClick={() => toggleBurgerMenu(burgerMenuBool)}
    />
  </div>
);

export default NavBar;
