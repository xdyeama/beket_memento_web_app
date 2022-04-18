import { AUTH } from '../constants/actionTypes'
import * as api from '../api/index.js'



export const signin = (formData, history) => async (dispatch) => {
    try{
        //Login user
        const { data } = await api.signin(formData);

        dispatch({ type: AUTH, data });

        history.push("/");
    }catch(err){
        console.log(err);
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try{
        // register user
        const { data } = await api.signup(formData);

        dispatch({ type: AUTH, data})

        history.push("/");

    }catch(err){
        console.log(err);
    }
}
