import React from 'react';

import avatarImg from '../assets/avatar.svg';
import Header from '../components/Header.jsx';

function TodoProfile() {
  return (
    <div className="page-container">
      <Header title="PROFILE" />
      <div className="profile-container">
        <div className="avatar-container">
          <img src={avatarImg} alt="Profile Avatar" className="profile-avatar" />
        </div>
        <h2 className="profile-name">GrowLog</h2>

        <div className="profile-tabs">
          <button className="tab-button active">할일 기록</button>
          <button className="tab-button">게시물</button>
        </div>

        <div className="tab-content">
          <div className="tasks-container">{/* 할일 기록 내용이 들어갈 자리 */}</div>
          <div className="posts-container">{/* 게시물 내용이 들어갈 자리 */}</div>
        </div>
      </div>
    </div>
  );
}

export default TodoProfile;
