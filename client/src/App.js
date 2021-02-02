import './App.css';
import React,{Fragment} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login  from './components/auth/Login';
import Register from './components/auth/Register';



const App = () => {
  return (
    <Router>
    <Fragment>
      {/* <h1> Hello I am running</h1> */}
      <Navbar/>
      <Route exact path="/" component={Landing}/>
      <section className="container">
         <Switch>
           <Route exact path="/login" component={Login}/>
           <Route exact path="/register" component={Register}/>
           </Switch> 
      </section>
    </Fragment>
    </Router>
  )
};

export default App;
