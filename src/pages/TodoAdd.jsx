import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header.jsx';
import { useTodoStore } from '../stores/useTodoStore.js';
import '../style/TodoForm.css';

const API_URL = 'http://localhost:3001';

// 중요도 옵션 (label: 화면, value: 서버/스토어)
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

  // 서버에서 돌아온 todo를 zustand에 추가
  const addLocalTodo = useTodoStore((state) => state.addTodoRemote);

  // TODO: 이후 zustand addTodo 등 실제 로직으로 교체 예정
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTodo = {
      title,
      description,
      saveAt: new Date().toISOString(),
      isComplete: true,
      priority: selectedPriority
    };

    // 빈 공백 입력 시 페이지 이동 방지
    if (!title.trim()) return;

    try {
      const resp = await fetch(`${API_URL}/todoList`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo)
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const saved = await resp.json();

      addLocalTodo(saved);

      // 입력 초기화
      setTitle('');
      setDescription('');
      setSelectedPriority('');

      // 메인 페이지로 이동
      navigate('/');
    } catch (err) {
      console.error('할 일 추가 중 오류:', err);
      alert('할 일 추가에 실패했습니다.');
    }
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

        <button type="submit" className="submit-btn">
          추가
        </button>
      </form>
    </div>
  );
}

export default TodoAdd;
