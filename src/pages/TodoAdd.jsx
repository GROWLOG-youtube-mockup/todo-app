// src/pages/TodoAdd.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header.jsx';
import { useTodoStore } from '../stores/useTodoStore.js';
import '../style/TodoForm.css';

const PRIORITY_OPTIONS = [
  { label: '높음', value: 'high', colorClass: 'red-dot' },
  { label: '중간', value: 'medium', colorClass: 'yellow-dot' },
  { label: '낮음', value: 'low', colorClass: 'green-dot' }
];

function TodoAdd() {
  const navigate = useNavigate();
  const addTodo = useTodoStore((state) => state.addTodo);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');

  // 제목, 설명, 중요도가 모두 선택되어야만 true
  const isFormValid = title.trim() !== '' && description.trim() !== '' && selectedPriority !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    // zustand store에 추가
    addTodo({
      title,
      description,
      isComplete: false,
      priority: selectedPriority
    });

    // 입력 초기화
    setTitle('');
    setDescription('');
    setSelectedPriority('');

    // 메인 페이지로 이동
    navigate('/');
  };

  return (
    <div className="page-container">
      <Header title="TODO 추가" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="title"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          id="description"
          placeholder="설명"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="priority-container">
          <label>중요도</label>
          <div className="priority-options">
            {PRIORITY_OPTIONS.map(({ label, value, colorClass }) => (
              <button
                key={value}
                type="button"
                className={`priority-btn ${selectedPriority === value ? 'active' : ''}`}
                onClick={() => setSelectedPriority(value)}
              >
                <span className={`priority-dot ${colorClass}`}>●</span> {label}
              </button>
            ))}
          </div>
        </div>

        <div className="empty-status-container" />

        <button type="submit" className="submit-btn" disabled={!isFormValid}>
          추가
        </button>
      </form>
    </div>
  );
}

export default TodoAdd;
