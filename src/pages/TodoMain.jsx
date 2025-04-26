import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header.jsx';
import '../style/TodoMain.css';

import CheckIcon from '../assets/Check_icon.svg';
import EditIcon from '../assets/Edit_icon.svg';
import DeleteIcon from '../assets/Trash_icon.svg';

function TodoMain() {
  const navigate = useNavigate();

  // 로컬 상태
  const [activeFilter, setActiveFilter] = useState('전체');
  const [sortOption, setSortOption] = useState('날짜순');
  const [showDropDown, setShowDropDown] = useState(false);

  // 임시 todo 데이터
  const todoList = [
    {
      id: 1,
      title: '스터디 과제 제출',
      description: 'React로 Todo App 만들기',
      priority: 'high',
      isComplete: false
    },
    {
      id: 2,
      title: '운동 가기',
      description: '저녁 7시에 헬스장',
      priority: 'medium',
      isComplete: false
    },
    {
      id: 3,
      title: '책 읽기',
      description: 'Clean Code 2장까지',
      priority: 'low',
      isComplete: true
    }
  ];

  const filters = ['전체', '진행 중', '완료됨'];
  const sortOptions = ['날짜순', '중요도순'];

  function toggleDropDown() {
    setShowDropDown(!showDropDown);
  }

  function handleSortChange(option) {
    setSortOption(option);
    setShowDropDown(false);
  }

  function getPriorityColorClass(priority) {
    switch (priority) {
      case 'high':
        return 'priority-1';
      case 'medium':
        return 'priority-2';
      case 'low':
      default:
        return 'priority-3';
    }
  }

  function handleEdit(id) {
    navigate(`/edit/${id}`);
  }

  // 정렬 기능 넣기 전이라 임의로 setTodoList라고 정하고 함수 생성해 둔 것(작동 안 됨)
  function handleDelete(id) {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  }

  function handleAdd() {
    navigate('/add');
  }

  function handleToggleComplete(id) {
    setTodoList((prev) => {
      return prev.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      );
    });
  }

  return (
    <div className="todo-container">
      <div className="todo-header">
        <Header
          title="TODO APP"
          centerTitle={true}
          showBackArrow={false}
          showProfile={true}
          showShare={true}
        />
      </div>

      <div className="filter-sort-container">
        <div className="filter-buttons">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-button ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="sort-dropdown">
          <button className="sort-button" onClick={toggleDropDown}>
            {sortOption} ▼
          </button>

          {showDropDown && (
            <div className="dropdown-menu">
              {sortOptions.map((option) => (
                <div
                  key={option}
                  className="dropdown-item"
                  onClick={() => handleSortChange(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ToDo 목록 렌더링 */}
      <div className="todo-list">
        {todoList.map((todo) => (
          <div key={todo.id} className="todo-item">
            <div className="todo-content">
              <div className={`color-dot ${getPriorityColorClass(todo.priority)}`} />
              <div className="todo-text">
                <p className="todo-title">{todo.title}</p>
                <p className="todo-description">{todo.description}</p>
              </div>
            </div>
            <div className="todo-actions">
              {!todo.isComplete && (
                <>
                  <img
                    src={EditIcon}
                    className="action-icon"
                    onClick={() => handleEdit(todo.id)}
                    alt="수정"
                  />
                  <img
                    src={DeleteIcon}
                    className="action-icon"
                    onClick={() => handleDelete(todo.id)}
                    alt="삭제"
                  />
                </>
              )}
              <img
                src={CheckIcon}
                className={`check-icon ${todo.isComplete ? 'check-complete' : 'check-incomplete'}`}
                onClick={() => handleToggleComplete(todo.id)}
                alt="완료 체크"
              />
            </div>
          </div>
        ))}
      </div>

      <button className="add-todo-button" onClick={() => handleAdd()}>
        +
      </button>
    </div>
  );
}

export default TodoMain;
