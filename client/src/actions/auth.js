import { AUTH} from '../constants/actionTypes';
import * as api from '../api';

// when actions are async so we want to use redux-thunk
export const signin = (formData, navigate) => async (dispatch) => {
    
    try{
        //log in the user
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data });
        navigate('/');
    }catch(error){
        console.log(error.message);
    }
}

export const signup = (formData, navigate) => async (dispatch) => {

    try{
        //sign up the user
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data });
        navigate('/');
    }catch(error){
        console.log(error);
    }
}