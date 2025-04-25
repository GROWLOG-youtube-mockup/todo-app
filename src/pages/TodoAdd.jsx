import React, { useState } from 'react';

import Header from '../components/Header.jsx';
import { useTodoStore } from '../stores/useTodoStore.js';
import '../style/TodoForm.css';

function TodoAdd() {
  /*
  // useTodoStore 사용 예시 코드
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleAdd = () => {
    if (!title.trim()) return;
    addTodo({ title, description, priority: 'medium' });
    setTitle('');
    setDescription('');
  };
  */

  return (
    <div className="page-container">
      <Header title="TODO 추가" />
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

        <div className="empty-status-container"></div> {/* 추가에는 상태 버튼이 없음. 스타일을 위해 추가가 */}


        <button type="submit" className="submit-btn">
          추가
        </button>
      </form>
    </div>
  );
}

export default TodoAdd;
