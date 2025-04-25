import React from 'react';

import avatarImg from '../assets/avatar.svg';
import Header from '../components/Header.jsx';
import '../style/TodoProfile.css';

function TodoProfile() {
  return (
    <div className="page-container">
      <Header title="PROFILE" />
      <div className="profile-container">
        <div className="avatar-container">
          <img src={avatarImg} alt="Profile Avatar" className="profile-avatar" />
          <h2 className="profile-name">GrowLog</h2>
        </div>
      </div>

      <div className="tab-contianer">
        <div className="profile-tabs">
          <button className="tab-button currentTab">할일 기록</button>
          <button className="tab-button">게시물</button>
        </div>

        <div className="tab-content">
          <div className="todo-container">
            <div className="todo-doing">
              <span className="todo-count doing">해야할 일</span>

              <div className="todo-item">
                <div className="priority-circle important"></div>
                <span>TODO 1 TODO 1 TODO 1 TODO 1 TODO 1 ...</span>
              </div>

              <div className="todo-item">
                <div className="priority-circle normal"></div>
                <span>할일 2</span>
              </div>
            </div>

            <div className="todo-done">
              <span className="todo-count done">완료한 일</span>
              <div className="todo-item">
                <div className="priority-circle none"></div>
                <span>할일 3</span>
              </div>
            </div>
          </div>

          <div className="post-container">{/* 게시물 내용이 들어갈 자리 */}</div>
        </div>
      </div>
    </div>
  );
}

export default TodoProfile;
