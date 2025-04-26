import { Routes, Route } from 'react-router-dom';

import TodoAdd from '../pages/TodoAdd.jsx';
import TodoEdit from '../pages/TodoEdit.jsx';
import TodoMain from '../pages/TodoMain.jsx';
import TodoProfile from '../pages/TodoProfile.jsx';

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
