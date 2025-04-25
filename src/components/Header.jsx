import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Header.css';

import ProfileIcon from '../assets/avatar.svg';
import ShareIcon from '../assets/share.svg';
import ArrowIcon from '../assets/Turn_BackPage_Button.svg';

function Header({
  title = 'Todo App',
  showBackArrow = true,
  showProfile = false,
  showShare = false,
  centerTitle = false
}) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="left-group">
          {showProfile && (
            <div className="icon profile-icon">
              <img src={ProfileIcon} alt="Profile" className="icon-img" />
            </div>
          )}
          {showBackArrow && (
            <Link to="/" className="arrow-left">
              <img src={ArrowIcon} alt="Back" className="icon-img" />
            </Link>
          )}
          <div className={`header-text ${centerTitle ? 'center-title' : ''}`}>{title}</div>
        </div>

        <div className="right-icons">
          {showShare && (
            <div className="icon">
              <img src={ShareIcon} alt="Share" className="icon-img" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
