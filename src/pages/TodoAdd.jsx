import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header.jsx';
import '../style/TodoForm.css';

const PRIORITY_OPTIONS = [
  { label: '높음', value: 'high', colorClass: 'red-dot' },
  { label: '중간', value: 'medium', colorClass: 'yellow-dot' },
  { label: '낮음', value: 'low', colorClass: 'green-dot' }
];

function TodoAdd() {
  // TODO: 이후 zustand 상태로 교체 예정
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('medium');

  // TODO: 이후 zustand addTodo 등 실제 로직으로 교체 예정
  const handleSubmit = (e) => {
    e.preventDefault();

    // 빈 공백 입력 시 페이지 이동 방지지
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!title.trim()) return;

    console.log('할 일 추가 요청:', {
      title,
      description,
      priority: selectedPriority || 'medium'
    });

    // 입력값 초기화
    setTitle('');
    setDescription('');
    setSelectedPriority('medium');

    // 메인 페이지로 이동
    navigate('/');
  };

  return (
    <div className="page-container">
      <Header title="TODO 추가" />
      <form onSubmit={handleSubmit}>
        <input type="text" id="title" placeholder="제목" />
        <input type="text" id="description" placeholder="설명" />

        <div className="priority-container">
          <label>중요도</label>
          <div className="priority-options">
            {PRIORITY_OPTIONS.map(({ label, colorClass }) => (
              <button
                key={label}
                type="button"
                className={`priority-btn ${selectedPriority === label ? 'active' : ''}`}
                onClick={() => setSelectedPriority(label)}
              >
                <span className={`priority-dot ${colorClass}`}>●</span> {label}
              </button>
            ))}
          </div>
        </div>

        <div className="empty-status-container" />

        <button type="submit" className="submit-btn">
          추가
        </button>
      </form>
    </div>
  );
}

export default TodoAdd;
