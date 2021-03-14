import api from '../utils/api';
import {setAlert} from './alert';
import {
    GET_PROFILE,
    PROFILE_ERROR
} from './types';

// Get Current users profile

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await api.get('/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        debugger
    } catch (error) {
        dispatch({
            type : PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
}