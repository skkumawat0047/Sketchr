import './App.css';
import Navbar from './components/Navbar/Navbar';
import Bottom from './components/Bottombar/Bottom';
import Sidebar from './components/Sidebar/Sidebar';
import Login from './components/Login/Login';
import Konva from './components/Konva/Konva';
import Home from './components/Home/Home'
import { useState } from 'react';
function App() {
  // const [Home,useHome]=useState(true);
  return (
    <div className="App">
      <header className="App-header">
        {/* {Home?(<>
          <Navbar/>
          <Sidebar/>
          <Konva/>
          <Bottom/>
        </>
        ):( */}
          <Login/>
        {/* )} */}
      </header>
    </div>
  );
}

export default App;
