import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Header.css';

function Header({ title = 'Todo App' }) {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="arrow-left">
          <img src="/src/assets/Turn_BackPage_Button.svg" alt="arrow-left" />
        </Link>

        <div className="header-text">{title}</div>
      </div>
    </header>
  );
}

export default Header;
