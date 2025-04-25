import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import { useTodoStore } from '../stores/useTodoStore.jsx';


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

  return (
    <div className="todo-container">
      <Header
        title="TODO APP"
        centerTitle={true}
        showBackArrow={false}
        showProfile={true}
        showShare={true}
      />
      <div className="filter-sort-container">
        <div className="filter-buttons">
          
        </div>
      </div>
    </div>
  );
}

export default TodoMain;
