import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../style/TodoMain.css';

import Header from '../components/Header.jsx';
import TodoList from '../components/TodoList.jsx';
import { useTodoStore } from '../stores/useTodoStore.js';

function TodoMain() {
  const navigate = useNavigate();

  const filters = ['전체', '진행 중', '완료됨'];
  const sortOptions = ['날짜순', '중요도순'];

  const [filterTodos, setFilterTodos] = useState([]);
  const [activeFilter, setActiveFilter] = useState('전체');
  const [sortOption, setSortOption] = useState('날짜순');
  const [showDropDown, setShowDropDown] = useState(false);

  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);

  function handleEdit(id) {
    navigate(`/edit/${id}`);
  }

  function handleAdd() {
    navigate('/add');
  }

  const getFilteredAndSortedTodos = (todoList, activeFilter, sortOption) => {
    let filterTodoList = todoList;

    if (activeFilter !== '전체') {
      const isComplete = activeFilter === '완료됨';
      filterTodoList = todoList.filter((todo) => todo.isComplete === isComplete);
    }

    if (sortOption === '중요도순') {
      const priorityOrder = {
        high: 1,
        medium: 2,
        low: 3
      };

      filterTodoList = filterTodoList
        .slice()
        .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else {
      filterTodoList = filterTodoList
        .slice()
        .sort((a, b) => new Date(b.saveAt).getTime() - new Date(a.saveAt).getTime());
    }

    return filterTodoList;
  };

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const handleSortChange = (option) => {
    if (sortOption !== option) {
      setSortOption(option);
      const updatedTodos = getFilteredAndSortedTodos(todos, activeFilter, option);
      setFilterTodos(updatedTodos);
    }

    setShowDropDown(false);
  };

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

  function handleDelete(id) {
    removeTodo(id);
  }

  function handleToggleComplete(id, isComplete) {
    const changeBoolean = !isComplete;
    updateTodo({ id, isComplete: changeBoolean });
  }

  const handleShare = () => {
    /* TODO: 추후 mock data 필요없을 때 수정해야 함 */
    if (todos.length < 1) {
      alert('공유할 할 일이 없습니다.');

      return;
    }

    const text = todos
      .map((todo, index) => `${index + 1}. [${todo.priority}] ${todo.title} - ${todo.description}`)
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
    /* TODO: 추후 mock data 필요없을 때 수정해야 함 */
    if (todos.length === 0) {
      const temporaryList = [
        {
          id: 1,
          title: 'TODO 1',
          description: 'TODO 메모',
          isComplete: false,
          priority: 'high'
        },
        {
          id: 2,
          title: 'TODO 2',
          description: 'TODO 메모',
          isComplete: false,
          priority: 'low'
        },
        {
          id: 3,
          title: 'TODO 3',
          description: 'TODO 메모',
          isComplete: true,
          priority: 'medium'
        }
      ];

      temporaryList.forEach((todoItem) => {
        addTodo(todoItem);
      });
    }
  }, [todos.length, addTodo]);

  useEffect(() => {
    const updatedTodos = getFilteredAndSortedTodos(todos, activeFilter, sortOption);
    setFilterTodos(updatedTodos);
  }, [todos, activeFilter, sortOption]);

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
