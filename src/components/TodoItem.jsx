import React from 'react';

function TodoItem({ title, description, priority }) {
  return (
    <>
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
        <button>COMPLETE</button>
      </div>
    </>
  );
}

export default TodoItem;
