import React from 'react';

function TodoItem({ title, description, priority, isComplete }) {
  return (
    <li>
      <div>
        <div>
          <div>{priority}</div>
          <div>{title}</div>
        </div>
        <div>{description}</div>
      </div>
      <div>
        <button>EDIT</button>
        <button>DELETE</button>
        <button disabled={isComplete}>COMPLETE</button>
      </div>
    </li>
  );
}

export default TodoItem;
