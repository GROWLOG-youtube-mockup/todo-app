import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Header from '../components/Header.jsx';

import '../style/TodoForm.css';

const API_URL = 'http://localhost:3001';

// 중요도 옵션 (label: 화면, value: 서버/스토어)
const PRIORITY_OPTIONS = [
  { label: '높음', value: 'high', colorClass: 'red-dot' },
  { label: '중간', value: 'medium', colorClass: 'yellow-dot' },
  { label: '낮음', value: 'low', colorClass: 'green-dot' }
];

// 상태 옵션 (label: 화면, value: boolean)
const STATUS_OPTIONS = [
  { label: '진행 중', value: false },
  { label: '완료됨', value: true }
];

function TodoEdit() {
  const navigate = useNavigate();

  // TODO: 이후 localStorage에서 값 불러와서 상태 초기화
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // TODO: 이후 수정 로직으로 대체
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('수정 요청:', {
      title,
      description,
      priority: selectedPriority,
      status: selectedStatus
    });
    navigate('/');
  };

  return (
    <div className="page-container">
      <Header title="TODO 편집" />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="설명"
        />

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

        <div className="status-container">
          <label>상태</label>
          <div className="status-options">
            {STATUS_OPTIONS.map((status) => (
              <button
                key={status}
                type="button"
                className={`status-btn ${status === '진행 중' ? 'status-active' : 'status-finished'} ${selectedStatus === status ? 'active' : ''}`}
                onClick={() => setSelectedStatus(status)}
              >
                {status}
              </button>
            ))}
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
