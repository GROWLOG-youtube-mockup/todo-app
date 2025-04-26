import React from 'react';
import { Link } from 'react-router-dom';

import List from '../components/List.jsx';
import { useFetchTodos } from '../hooks/useFetchTodos.js';
import { useTodoStore } from '../stores/useTodoStore.js';

function TodoMain() {
  const todoList = useTodoStore((state) => state.todos);
  const { todos, loading, error } = useFetchTodos();

  if (todoList.length < 1 && error) alert('데이터가 존재하지 않습니다.');

  const handleShare = () => {
    /* TODO: 추후 mock data 필요없을 때 수정해야 함 */
    if (todoList.length < 1 && (error || todos.todos.length < 1)) {
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

      {
        /* TODO: 추후 mock data 필요없을 때 수정해야 함 */
        loading ? <div>로딩 중...</div> : <List todos={todoList > 0 ? todoList : todos.todos} />
      }
    </div>
  );
}

export default TodoMain;
