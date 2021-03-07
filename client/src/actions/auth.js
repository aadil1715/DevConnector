import api from '../utils/api';
import {setAlert} from './alert';
import{
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

export const register = ({ name,email,password }) => async dispatch => {
    

    const body = JSON.stringify({name,email,password});
    console.log(body);

    try{
        const res = await api.post('/users',body);
        console.log('res',res);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    } catch(err){
        console.log(err);
        const errors = err.response.data.errors;
        //console.log("INHHEREE")        
        console.log(err.message);
        

        if (errors) {
            console.log("HERE IN")
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            console.log("IN HERE")
          }
        dispatch({
            type: REGISTER_FAIL
        })

    }

}