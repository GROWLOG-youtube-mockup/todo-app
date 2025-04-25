import React, { useEffect, useState } from 'react';

import avatarImg from '../assets/avatar.svg';
import Header from '../components/Header.jsx';
import useTabStore from '../stores/useTabStore.js';
import '../style/TodoProfile.css';

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
  const { currentTab, setCurrentTab } = useTabStore();

  return (
    <nav className="profile-tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setCurrentTab(tab)}
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
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch('http://localhost:3001/todoList');
        const data = await res.json();
        setTodos(data);
      } catch (err) {
        if (err instanceof Error) console.log(err.stack);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!todos || todos.length === 0) return <p>There is no data</p>;

  const filteredTodos = todos.filter((todo) =>
    isCompleted == 'true' ? todo.isComplete : !todo.isComplete
  );
  const toggleAcordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div onClick={toggleAcordion} className="accordion-header">
        <span className="todo-count">{isCompleted == 'true' ? '완료된 할 일' : '해야 할 일'}</span>
        <span className={`todo-count accordion-icon ${isOpen ? 'minus-icon' : 'plus-icon'}`}>
          {isOpen ? '-' : '+'}
        </span>
      </div>

      {isOpen &&
        filteredTodos.map((todo) => (
          <div className="todo-item">
            <div className={`priority-circle ${todo.priority}`}></div>
            <span key={todo.id}>{todo.title}</span>
          </div>
        ))}
    </>
  );
};
const PostsTab = () => {
  return <div className="post-container">Posts</div>;
};
