import { headerAPI, securityAPI } from '../api/api';
import { stopSubmit } from 'redux-form';

const SET_AUTH_USER_DATA = 'my-app/authReducer/SET_AUTH_USER_DATA';
const SET_CAPTCHA_URL = 'my-app/authReducer/SET_CAPTCHA_URL';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaURL: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA: {
            return {
                ...state,
                ...action.payload
            }
        }
        case SET_CAPTCHA_URL: {
            return {
                ...state,
                captchaURL: action.captchaURL
            }
        }
        default:
            return state;
    }
}

export const setAuthUserData = (id, email, login, isAuth) => {
    return { type: SET_AUTH_USER_DATA, payload: {id, email, login, isAuth} };
}
export const setCaptchaURL = (captchaURL) => {
    return { type: SET_CAPTCHA_URL, captchaURL };
}

export const getAuthUserDataThunk = () => async (dispatch) => {
    let data = await headerAPI.me()
        if(data.resultCode === 0) {
        let {id, email, login} = data.data;
        dispatch(setAuthUserData(id, email, login, true));   
        }   
    }

export const LoginThunk = (email, password, rememberMe, captcha) => async (dispatch) => {
    let data = await headerAPI.login(email, password, rememberMe, captcha)
    if(data.resultCode === 0) {
        dispatch(getAuthUserDataThunk());            
        } else {
            if(data.resultCode === 10) {
                dispatch(getCaptchaURLThunk());
            } else {
                let errorMessage = data.messages.length > 0 ? data.messages[0] : "Some error"
                dispatch(stopSubmit("login", {_error: errorMessage}));
        } 
    }
}

export const LogoutThunk = () => async (dispatch) => {
    let data = await headerAPI.logout()
    if(data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));            
    }
}

export const getCaptchaURLThunk = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaURL();
    const captchaURL = response.data.url;
        dispatch(setCaptchaURL(captchaURL));            
}

export default authReducer;
