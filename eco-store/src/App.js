import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home/Home';
import Navbar from './components/Navbar.jsx/Navbar';
import Footer from './components/Footer/Footer';
import MainRoute from './Pages/MainRoute';

function App() {
  return (
    <div className="App">
       <Navbar />
       
    <MainRoute />

      <Footer />
    </div>
  );
}

export default App;
