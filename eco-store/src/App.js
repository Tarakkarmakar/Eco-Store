import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home/Home';
import Navbar from './components/Navbar.jsx/Navbar';
import Footer from './components/Footer/Footer';
import MainRoute from './Pages/MainRoute';
import { useSelector } from 'react-redux';
import { Skeleton, SkeletonCircle, SkeletonText,Box } from '@chakra-ui/react'

function App() {
  const isloading=useSelector((store)=>store.isLoading)
  if(isloading){
    return (
      <Box padding='6' boxShadow='lg' bg='white'>
  <SkeletonCircle size='10' />
  <SkeletonText mt='4' noOfLines={10} spacing='4' skeletonHeight='5' />
</Box>
    )
  }
  else{
  return (
    <div className="App">
       <Navbar />
       
    <MainRoute />

      <Footer />
    </div>
  );
  }
}

export default App;
