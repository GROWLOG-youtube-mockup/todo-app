import React from 'react';

import CheckIcon from '../assets/Check_icon.svg';
import EditIcon from '../assets/Edit_icon.svg';
import DeleteIcon from '../assets/Trash_icon.svg';

function TodoList({
  todoList,
  getPriorityColorClass,
  handleEdit,
  handleDelete,
  handleToggleComplete
}) {
  return (
    <div className="todo-list">
      {todoList.map((todo) => (
        <div key={todo.id} className={`todo-item ${todo.isComplete ? 'completed-item' : ''}`}>
          <div className="todo-content">
            <div className={`color-dot ${getPriorityColorClass(todo.priority)}`} />
            <div className="todo-text">
              <p className="todo-title">{todo.title}</p>
              <p className="todo-description">{todo.description}</p>
            </div>
          </div>
          <div className="todo-actions">
            {!todo.isComplete && (
              <>
                <img
                  src={EditIcon}
                  className="action-icon"
                  onClick={() => handleEdit(todo.id)}
                  alt="수정"
                />
                <img
                  src={DeleteIcon}
                  className="action-icon"
                  onClick={() => handleDelete(todo.id)}
                  alt="삭제"
                />
              </>
            )}
            <img
              src={CheckIcon}
              className={`action-icon ${todo.isComplete ? 'check-complete' : 'check-incomplete'}`}
              onClick={() => handleToggleComplete(todo.id, todo.isComplete)}
              alt="완료 체크"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
