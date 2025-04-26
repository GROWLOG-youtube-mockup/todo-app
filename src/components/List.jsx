import React from 'react';

import TodoItem from './TodoItem.jsx';

function List({ todos }) {
  return (
    <ul>
      {todos.map(({ id, title, description, priority, isComplete }) => (
        <TodoItem
          key={id}
          todo={title}
          description={description}
          priority={priority}
          isComplete={isComplete}
        />
      ))}
    </ul>
  );
}

export default List;
