import './App.css';
import React,{Fragment,useEffect} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login  from './components/auth/Login';
import Register from './components/auth/Register';
//Redux
import {Provider} from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';


if(localStorage.token){
  setAuthToken(localStorage.token);
}


const App = () => {

  useEffect(()=>{
    store.dispatch(loadUser());
  },[]);
  return (
     <Provider store={store}>
      <Router>
      <Fragment>
        {/* <h1> Hello I am running</h1> */}
        <Navbar/>
        <Route exact path="/" component={Landing}/>
        <section className="container">
          <Alert/>
          <Switch>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            </Switch> 
        </section>
      </Fragment>
      </Router>
     </Provider>
  )
};

export default App;
