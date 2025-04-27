//import { useState } from 'react';
// import { createComponent } from './utils/util.jsx';

import './style/App.css';
import AppRouter from './router/AppRouter.jsx';

function App() {
  return (
    <div className="app-container">
      <div className="mobile-box">
        <main className="content-container">
          <AppRouter />
        </main>
      </div>
    </div>
  );
}

export default App;
