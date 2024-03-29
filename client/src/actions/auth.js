import api from '../utils/api';
import {setAlert} from './alert';
import{
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE
} from './types';
import setAuthToken from '../utils/setAuthToken';


// Load User
export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try {
      const res = await api.get('/auth');
  
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };
  
//REGISTER USER
export const register = ({ name,email,password }) => async dispatch => {
    

    const body = JSON.stringify({name,email,password});
   // console.log(body);

    try{
        const res = await api.post('/users',body);
       // console.log('res',res);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch(err){
       // console.log(err);
        const errors = err.response.data.errors;
        //console.log("INHHEREE")        
        //console.log(err.message);
        

        if (errors) {
            //console.log("HERE IN")
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            //console.log("IN HERE")
          }
        dispatch({
            type: REGISTER_FAIL
        })

    }
  }

    //LOGIN USER
export const login = (email,password ) => async dispatch => {
    
  const body = JSON.stringify({email,password});
 //console.log(body);

  try{
      const res = await api.post('/auth',body);
     // console.log('res',res);
      dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
      });

      dispatch(loadUser());
  } catch(err){
     // console.log(err);
      const errors = err.response.data.errors;
      //console.log("INHHEREE")        
      //console.log(err.message);
      

      if (errors) {
          //console.log("HERE IN")
          errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
          //console.log("IN HERE")
        }
      dispatch({
          type: LOGIN_FAIL
      })

  };
}

  export const logout = () => dispatch => {
    dispatch({
      type: CLEAR_PROFILE
    });
    dispatch({
      type: LOGOUT
    });
  };
