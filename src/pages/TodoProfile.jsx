import React, { useEffect, useState } from 'react';

import Header from '../components/Header.jsx';
import useTabStore from '../stores/useTabStore.js';

function TodoProfile() {
  const { currentTab } = useTabStore();
  return (
    <div className="page-container">
      <Header title="PROFILE" />

      {/*작업시 삭제후 진행해주세요*/}
      <h1>프로필 페이지</h1>
      <TabNav />
      <div style={{ width: '80%' }}>
        {currentTab === '할 일' && <TodoTab />}
        {currentTab === '게시글' && <PostsTab />}
      </div>
    </div>
  );
}

export default TodoProfile;

const tabs = ['할 일', '게시글'];
const TabNav = () => {
  const { currentTab, setCurrentTab } = useTabStore();

  return (
    <div>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setCurrentTab(tab)}
          className={currentTab === tab ? 'currentTab' : ''}
        >
          {tab}
        </button>
      ))}
    </div>
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
      <div
        className="accordion-header"
        onClick={toggleAcordion}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignContent: 'center'
        }}
      >
        <h3>{isCompleted == 'true' ? '완료된 할 일' : '해야 할 일'}</h3>
        <p>{isOpen ? '-' : '+'}</p>
      </div>

      <div>
        {isOpen && (
          <ul>
            {filteredTodos.map((todo) => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
const PostsTab = () => {
  return <div>Posts</div>;
};
