import React from 'react';

import Header from '../components/Header.jsx';
import '../style/TodoForm.css';

function TodoEdit() {
  return (
    <div className="page-container">
      <Header title="TODO 편집" />

      <form>
        <input type="text" id="title" placeholder="제목" />
        <input type="text" id="description" placeholder="설명" />

        <div className="priority-container">
          <label>중요도</label>
          <div className="priority-options">
            <button type="button" className="priority-btn">
              <span className="priority-dot red-dot">●</span> 높음
            </button>
            <button type="button" className="priority-btn">
              <span className="priority-dot yellow-dot">●</span> 중간
            </button>
            <button type="button" className="priority-btn">
              <span className="priority-dot green-dot">●</span> 낮음
            </button>
          </div>
        </div>

        <div className="status-container">
          <label>상태</label>
          <div className="status-options">
            <button type="button" className="status-btn status-active">
              진행 중
            </button>
            <button type="button" className="status-btn status-finished">
              완료됨
            </button>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          수정
        </button>
      </form>
    </div>
  );
}

export default TodoEdit;
