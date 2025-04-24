import React from 'react';
import { Link } from 'react-router-dom';

function TodoMain() {
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
    </div>
  );
}

export default TodoMain;
