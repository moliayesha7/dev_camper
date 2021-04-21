import React, { useState, useRef } from "react";

const Menu = () => {
const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  return (
    <div className="menu-container">
      <button onClick={onClick} className="menu-trigger">
        <span>DevCamper</span>
       
      </button>
      <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
        <ul>
          <li><a href="/messages">Bootcamp</a></li>
          <li><a href="/trips">Courses</a></li>
         
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
