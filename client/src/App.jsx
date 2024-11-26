import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRouter from '../MainRouter.jsx';

const App = () => {
  return (
    <div className='layout'>
      <div className='content'>
        <Router>
          <MainRouter />
        </Router>
      </div>
    </div>
  );
};

export default App;