import { Routes, Route } from 'react-router-dom';

import TodoMain from '../pages/TodoMain';
import TodoProfile from '../pages/TodoProfile';
import TodoAdd from '../pages/TodoAdd';
import TodoEdit from '../pages/TodoEdit';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<TodoMain />} />
      <Route path="/profile" element={<TodoProfile />} />
      <Route path="/add" element={<TodoAdd />} />
      <Route path="/edit" element={<TodoEdit />} />
    </Routes>
  );
}

export default AppRouter;
