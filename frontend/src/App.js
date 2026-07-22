import { Routes, Route } from 'react-router';
import './App.css';
import Login from './page/Login/Login';
import Root from './page/Root'
import Home from './components/Home/Home'
import RegisterPage from './page/Login/Registerpage';
import Dashboard from './page/Dashboard'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Root />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/board/new" element={<Home />} />
        <Route path="/board/:id" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
