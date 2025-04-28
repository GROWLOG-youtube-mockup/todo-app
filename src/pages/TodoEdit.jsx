// src/pages/TodoEdit.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Header from '../components/Header.jsx';
import { useTodoStore } from '../stores/useTodoStore.js';
import '../style/TodoForm.css';

// 중요도 옵션 (label: 화면, value: store에 저장할 값)
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
  const { id } = useParams();
  const todos = useTodoStore((s) => s.todos);
  const updateTodo = useTodoStore((s) => s.updateTodo);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(null);

  // 제목, 설명, 중요도, 상태 모두 선택되어야만 true
  const isFormValid =
    title.trim() !== '' &&
    description.trim() !== '' &&
    selectedPriority !== '' &&
    selectedStatus !== null;

  // 1) 로컬 스토어에서 해당 ID의 todo 불러오기
  useEffect(() => {
    const todoId = Number(id);
    const todo = todos.find((t) => t.id === todoId);
    if (!todo) {
      alert('해당 할 일을 찾을 수 없습니다.');
      return navigate('/');
    }
    setTitle(todo.title);
    setDescription(todo.description);
    setSelectedStatus(todo.isComplete);
    setSelectedPriority(todo.priority);
  }, [id, todos, navigate]);

  // 2) 수정 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    updateTodo({
      id: Number(id),
      title,
      description,
      isComplete: selectedStatus,
      priority: selectedPriority
    });

    navigate('/');
  };

  return (
    <div className="page-container">
      <Header title="TODO 편집" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
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

        <div className="status-container">
          <label>상태</label>
          <div className="status-options">
            {STATUS_OPTIONS.map(({ label, value }) => (
              <button
                key={value.toString()}
                type="button"
                className={`status-btn ${
                  value ? 'status-finished' : 'status-active'
                } ${selectedStatus === value ? 'active' : ''}`}
                onClick={() => setSelectedStatus(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={!isFormValid}>
          수정
        </button>
      </form>
    </div>
  );
}

export default TodoEdit;
