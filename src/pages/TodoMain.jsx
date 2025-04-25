import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header.jsx';
import { useTodoStore } from '../stores/useTodoStore.js';
import '../style/TodoMain.css';

function TodoMain() {
  // 로컬 상태
  const [activeFilter, setActiveFilter] = useState('전체');
  const [sortOption, setSortOption] = useState('날짜순');
  const [showDropDown, setShowDropDown] = useState(false);

  // todo, 액션 가져옴
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);

  // 필터 옵션
  const filters = ['전체', '진행 중', '완료됨'];

  // 정렬 옵션
  const sortOptions = ['날짜순', '중요도순'];

  // 필터, 정렬 기능 구현 자리

  function toggleDropDown() {
    setShowDropDown(!showDropDown);
  }

  function handleSortChange(option) {
    setSortOption(option);
    setShowDropDown(false);
  }

  // 중요도에 따른 색 결정
  function getPriorityColorClass(priority) {
    switch (priority) {
      case 'high':
        return 'priority-3';
      case 'medium':
        return 'priority-2';
      case 'low':
      default:
        return 'priority-1';
    }
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
      <button className="add-todo-button">+</button>
    </div>
  );
}

export default TodoMain;
