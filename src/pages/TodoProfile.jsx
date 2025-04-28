import React, { useState } from 'react';

import avatarImg from '../assets/avatar.svg';
import Header from '../components/Header.jsx';
import useTabStore from '../stores/useTabStore.js';
import '../style/TodoProfile.css';
import { useTodoStore } from '../stores/useTodoStore.js';

function TodoProfile() {
  const { currentTab } = useTabStore();
  return (
    <div className="page-container">
      <Header title="PROFILE" />

      <main className="profile-container">
        <section className="avatar-container">
          <img src={avatarImg} alt="Profile Avatar" className="profile-avatar" />
          <h2 className="profile-name">GrowLog</h2>
        </section>

        <TabNav />

        <section className="tab-content">
          {currentTab === '할 일' && <TodoTab />}
          {currentTab === '게시글' && <PostsTab />}
        </section>
      </main>
    </div>
  );
}

export default TodoProfile;

const TabNav = () => {
  const tabs = ['할 일', '게시글'];
  const [currentTab, setCurrentTab] = useState('할 일');

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <nav className="profile-tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={currentTab === tab ? 'tab-button currentTab' : 'tab-button'}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
};

const TodoTab = () => {
  return (
    <>
      <TodoListContainer isCompleted="false" />
      <TodoListContainer isCompleted="true" />
    </>
  );
};

const TodoListContainer = ({ isCompleted }) => {
  const todos = useTodoStore((state) => state.todos);
  const { loadedTodoCount, loadMoreTodos } = useTabStore();
  const [isOpen, setIsOpen] = useState(true);

  const filteredTodos = todos.filter((todo) =>
    isCompleted == 'true' ? todo.isComplete : !todo.isComplete
  );
  const toggleAcordion = () => {
    setIsOpen((prev) => !prev);
  };

  console.log(todos);
  return (
    <>
      <div onClick={toggleAcordion} className="accordion-header">
        <span className="todo-count">{isCompleted == 'true' ? '완료된 할 일' : '해야 할 일'}</span>
        <span className={`todo-count accordion-icon ${isOpen ? 'minus-icon' : 'plus-icon'}`}>
          {isOpen ? '-' : '+'}
        </span>
      </div>

      {isOpen && (
        <>
          {filteredTodos.slice(0, loadedTodoCount).map((todo) => (
            <div className="todo-item" key={todo.id}>
              <div className={`priority-circle ${todo.priority}`} />
              <span className="todo-title">{todo.title}</span>
            </div>
          ))}
          {filteredTodos.length > loadedTodoCount && (
            <button className="btn-load-more" onClick={loadMoreTodos}>
              더보기
            </button>
          )}
        </>
      )}
    </>
  );
};
const PostsTab = () => {
  return (
    <div className="post-container">
      <div className="css-grid-container">
        {Array.from({ length: 15 }, (_, index) => (
          <div key={`cell-${index}`} className="grid-cell"></div>
        ))}
      </div>
    </div>
  );
};
