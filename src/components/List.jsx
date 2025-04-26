import React from 'react';

import TodoItem from './TodoItem.jsx';

function List({ todos }) {
  return (
    <div>
      {todos.map(({ id, title, description, priority }) => (
        <TodoItem key={id} todo={title} description={description} priority={priority} />
      ))}
    </div>
  );
}

export default List;
