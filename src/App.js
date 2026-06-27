import './App.css';
import Navbar from './components/Navbar/Navbar';
import Bottom from './components/Bottombar/Bottom';
import Sidebar from './components/Sidebar/Sidebar';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar/>
        <Sidebar/>
        <Bottom/>
      </header>
    </div>
  );
}

export default App;
