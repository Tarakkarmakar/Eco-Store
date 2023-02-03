import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home/Home';
import Navbar from './components/Navbar.jsx/Navbar';

function App() {
  return (
    <div className="App">
       <Navbar />
       
      <Home />
    </div>
  );
}

export default App;
