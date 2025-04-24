import React from 'react';

import Header from '../components/Header.jsx';
import useTabStore from '../store/useTabStore.js';

function TodoProfile() {
  const { currentTab } = useTabStore();
  return (
    <div className="page-container">
      <Header title="PROFILE" />

      {/*작업시 삭제후 진행해주세요*/}
      <h1>프로필 페이지</h1>
      <TabNav />
      <div>
        {currentTab === '할 일' && <TodoList />}
        {currentTab === '게시글' && <Posts />}
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

const TodoList = () => {
  return <div>TodoList</div>;
};
const Posts = () => {
  return <div>Posts</div>;
};
