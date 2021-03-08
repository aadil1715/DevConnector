import api from '../utils/api';
import {setAlert} from './alert';
import{
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR
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