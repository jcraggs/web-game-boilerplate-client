import React, { useState } from "react";
import closeIcon from "../../icons/closeIcon.png";
import openIcon from "../../icons/openIcon.png";
import "./MenuItem.css";

const MenuItem = ({ title, content }) => {
  const [subMenuBool, toggleSubMenu] = useState(false);

  const showOrHide = (subMenuBool) => {
    toggleSubMenu(!subMenuBool);
  };

  return (
    <div
      className="menuItemOuterContainer"
      onClick={() => showOrHide(subMenuBool)}
    >
      <div className="menuItemContainer">
        <p className="subMenuTitle">{title}</p>
        <img
          className="toggleButton"
          src={subMenuBool ? openIcon : closeIcon}
          alt="show info"
          onClick={() => showOrHide(subMenuBool)}
        />
      </div>
      {subMenuBool ? <div className="subMenuContent">{content}</div> : null}
    </div>
  );
};

export default MenuItem;
