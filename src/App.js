import { useState } from 'react';
import { Routes, Route } from 'react-router';
import './App.css';
import Login from './components/Login/Login';
import Root from './components/Home/Root'
import Home from './components/Home/Home'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path='/' element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Home" element={<Home />} />
          </Routes>
      </header>
    </div>
  );
}

export default App;
