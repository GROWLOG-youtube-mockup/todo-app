import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import '../style/TodoMain.css';

import Header from '../components/Header.jsx';
import TodoList from '../components/TodoList.jsx';
import { useTodoStore } from '../stores/useTodoStore.js';

function TodoMain() {
  const navigate = useNavigate();

  const [filterTodos, setFilterTodos] = useState([]);
  const [activeFilter, setActiveFilter] = useState('전체');
  const [sortOption, setSortOption] = useState('날짜순');
  const [showDropDown, setShowDropDown] = useState(false);

  const todos = useTodoStore((state) => state.todos);

  // 연동 전 임시 todo 데이터(저장 시간 X)
  const todoList = useMemo(() => {
    return todos.length > 0
      ? todos
      : [
          {
            id: 1,
            title: 'TODO 1',
            description: 'TODO 메모',
            saveAt: '2025-04-24T09:30:00Z',
            isComplete: false,
            priority: 'high'
          },
          {
            id: 2,
            title: 'TODO 2',
            description: 'TODO 메모',
            saveAt: '2025-04-23T09:30:00Z',
            isComplete: false,
            priority: 'low'
          },
          {
            id: 3,
            title: 'TODO 3',
            description: 'TODO 메모',
            saveAt: '2025-04-24T09:00:00Z',
            isComplete: true,
            priority: 'medium'
          }
        ];
  }, [todos]);

  const filters = ['전체', '진행 중', '완료됨'];
  const sortOptions = ['날짜순', '중요도순'];

  function toggleDropDown() {
    setShowDropDown(!showDropDown);
  }

  function handleSortChange(option) {
    setSortOption(option);
    setShowDropDown(false);
  }

  const getPriorityColorClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-1';
      case 'medium':
        return 'priority-2';
      case 'low':
      default:
        return 'priority-3';
    }
  };

  function handleEdit(id) {
    navigate(`/edit/${id}`);
  }

  // 정렬 기능 넣기 전이라 임의로 setTodoList라고 정하고 함수 생성해 둔 것(작동 안 됨)
  function handleDelete(id) {
    console.log(id);
    // setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  }

  function handleAdd() {
    navigate('/add');
  }

  function handleToggleComplete(id) {
    console.log(id);
    // setTodoList((prev) => {
    //   return prev.map((todo) =>
    //     todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
    //   );
    // });
  }

  const handleShare = () => {
    /* TODO: 추후 mock data 필요없을 때 수정해야 함 */
    if (todoList.length < 1 && todos.todos.length < 1) {
      alert('공유할 할 일이 없습니다.');

      return;
    }

    const text =
      todoList.length > 0
        ? todoList
        : todos.todos
            .map(
              (todo, index) =>
                `${index + 1}. [${todo.priority}] ${todo.title} - ${todo.description}`
            )
            .join('\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'todo-list.txt';
    a.click();

    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    let filterTodoList = [];

    if (activeFilter !== '전체') {
      const isComplete = activeFilter === '완료됨';
      filterTodoList = todoList.filter((todo) => todo.isComplete === isComplete);
    }

    if (sortOption === '중요도순') {
      filterTodoList.sort((a, b) => b.priority - a.priority);
    } else {
      filterTodoList.sort((a, b) => b.saveAt - a.saveAt);
    }

    setFilterTodos(filterTodoList);
  }, [todoList, activeFilter, sortOption]);

  return (
    <div className="todo-container">
      <div className="todo-header">
        <Header
          title="TODO APP"
          centerTitle={true}
          showBackArrow={false}
          showProfile={true}
          showShare={true}
          handleShare={handleShare}
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
      <TodoList
        todoList={filterTodos}
        getPriorityColorClass={getPriorityColorClass}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleToggleComplete={handleToggleComplete}
      />

      <button className="add-todo-button" onClick={() => handleAdd()}>
        +
      </button>
    </div>
  );
}

export default TodoMain;
