import React from 'react';

import Header from '../components/Header.jsx';

function TodoAdd() {
  /*
  // useTodoStore 사용 예시 코드
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleAdd = () => {
    if (!title.trim()) return;
    addTodo({ title, description, priority: 'medium' });
    setTitle('');
    setDescription('');
  };
  */

  return (
    <div className="page-container">
      <Header title="TODO 추가" />

      {/*작업시 삭제후 진행해주세요*/}
      <h1>추가 페이지</h1>
      {/*작업시 삭제후 진행해주세요*/}
    </div>
  );
}

export default TodoAdd;
