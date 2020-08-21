import { getAuthUserDataThunk } from './authReducer';

const SET_INITIALIZIED = 'my-app/appReducer/SET_INITIALIZIED'; //actioni veradarcrac obyektin talis enq anun
                                                              //vorpesi case: anun grenq, ayl voch aboxj obyekty
let initialState = {
    initializied: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZIED:
            return {
                ...state,
                initializied: true
            }
    
        default:
            return state;
    }
}

export const setInitializied = () => { 
    return { type: SET_INITIALIZIED };
}

export const setInitializiedThunk = () => (dispatch) => {
        let promise = dispatch(getAuthUserDataThunk());
        Promise.all([promise])
        .then( () => {
            dispatch(setInitializied());
           });
}

export default appReducer;
