import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Todo from './Pages/Todo';

const App =() => {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/todo' element={<Todo />} />
      </Routes>
    </Router>
  );
}

export default App;
