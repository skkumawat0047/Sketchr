import { useState } from 'react';
import { Routes, Route } from 'react-router';
import './App.css';
import Login from './page/Login/Login';
import Root from './page/Root'
import Home from './components/Home/Home'
import RegisterPage from './page/Login/Registerpage';
import Dashboard from './page/Dashboard'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path='/' element={<Root />} />
            <Route path="/login" element={<Login onLoginSuccess={()=>setIsLoggedIn(true)}/>} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Home" element={<Home />} />
          </Routes>
      </header>
    </div>
  );
}

export default App;
