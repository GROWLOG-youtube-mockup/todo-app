import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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

// 상태 옵션 (label: 화면, value: boolean)
const STATUS_OPTIONS = [
  { label: '진행 중', value: false },
  { label: '완료됨', value: true }
];

function TodoEdit() {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 :id 추출
  const updateLocalTodo = useTodoStore((s) => s.updateTodo);

  // TODO: 이후 localStorage에서 값 불러와서 상태 초기화
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [loading, setLoading] = useState(true);

  // 1) 기존 Todo 로드
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/todoList/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setTitle(data.title);
        setDescription(data.description);
        setSelectedPriority(data.priority ?? '');
        setSelectedStatus(!!data.isComplete);
      } catch (err) {
        console.error('할 일 로드 실패:', err);
        alert('할 일 정보를 불러올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // 2) 수정 제출 기능 구현
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        id: Number(id),
        title,
        description,
        priority: selectedPriority,
        isComplete: selectedStatus,
        saveAt: new Date().toISOString()
      };

      const res = await fetch(`${API_URL}/todoList/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const updated = await res.json();

      // zustand 스토어에도 반영
      updateLocalTodo({
        id: updated.id,
        title: updated.title,
        description: updated.description,
        priority: updated.priority,
        isComplete: updated.isComplete
      });

      // 메인으로 이동
      navigate('/');
    } catch (err) {
      console.error('수정 실패:', err);
      alert('할 일 수정에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <Header title="TODO 편집" />
        <p>로딩 중…</p>
      </div>
    );
  }

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
