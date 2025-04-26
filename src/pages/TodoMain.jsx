import React from 'react';
import { Link } from 'react-router-dom';

import List from '../components/List.jsx';
import { useTodoStore } from '../stores/useTodoStore.js';

function TodoMain() {
  const todos = useTodoStore((state) => state.todos);

  const handleShare = () => {
    if (todos.length === 0) {
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

  return (
    <div className="page-container">
      {/*작업시 삭제후 진행해주세요*/}
      <h1>할 일 목록 메인</h1>
      <div className="button-container">
        <Link to="/profile" className="nav-button">
          프로필 이동 예시
        </Link>
      </div>

      <div className="button-container">
        <Link to="/add" className="nav-button">
          추가하기 예시
        </Link>
      </div>
      <div className="button-container">
        <Link to="/edit" className="nav-button">
          수정하기 예시
        </Link>
      </div>
      {/*작업시 삭제후 진행해주세요*/}

      <div>
        <button onClick={handleShare}>BUTTON</button>
      </div>

      <List todos={todos} />
    </div>
  );
}

export default TodoMain;
