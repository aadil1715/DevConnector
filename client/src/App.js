import logo from './logo.svg';
import './App.css';
import React,{Fragment} from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';


const App = () => {
  return (
    <Fragment>
      {/* <h1> Hello I am running</h1> */}
      <Navbar/>
       <Landing/>
    </Fragment>
    
  )
};

export default App;
