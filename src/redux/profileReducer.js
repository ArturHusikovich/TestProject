import {profileAPI} from '../api/api';
import { stopSubmit } from 'redux-form';

const ADD_POST = 'ADD_POST';   // sa prosto straxovkaya, vor erku dzevov el grenq AC-n ashxati
const SET_PROFILE = 'SET_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
    posts: [
        { id: 1, message: 'Hello, how are u?', countlike: 10 },
        { id: 2, message: 'I am fine', countlike: 3 },
        { id: 4, message: 'will be fine', countlike: 100 }
    ],
    profile: null,
    status: ' '  
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
        let newPost = {
            id: 5,
            message: action.PostBody, 
            countlike: 0
        };
            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        }
       case SET_PROFILE: {
           return {
               ...state,
               profile: action.profile
           }
       }
       case SET_STATUS: {
           return {
               ...state,
               status: action.status
           }
       }
       case SAVE_PHOTO_SUCCESS: {
           return {
               ...state,
               profile: {...state.profile, photos: action.photos}
           }
       }

        default: 
        return state;
    }
    
} 

export const addPostAC = (PostBody) => {  //ays AC-ery talis en action-obyektner
    return {type: ADD_POST, PostBody};
}
export const setProfile = (profile) => {
    return {type: SET_PROFILE, profile};
}
export const setStatus = (status) => {
    return {type: SET_STATUS, status};
}
export const savePhotoSuccess = (photos) => {
    return {type: SAVE_PHOTO_SUCCESS, photos}
}

export const setProfileThunk = (userId) => async (dispatch) => { 
    let response = await profileAPI.setProfileData(userId)
    dispatch(setProfile(response.data))
} 

export const setProfileStatusThunk = (userId) => async (dispatch) => {
    let response = await profileAPI.setProfileStatus(userId)
    dispatch(setStatus(response.data))
}
export const updateProfileStatusThunk = (status) => async (dispatch) => {
    let response = await profileAPI.updateProfileStatus(status)
    if(response.data.resultCode === 0) {
        dispatch(setStatus(status));
        }
    } 
export const savePhotoThunk = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
        if(response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos));
            }
        }
export const saveProfileThunk = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.id;   //stanum enq id-n
    const response = await profileAPI.saveProfile(profile)
        if(response.data.resultCode === 0) {
            dispatch(setProfileThunk(userId));
             } else {
                let errorMessage = response.data.messages[0];
                 dispatch(stopSubmit("profile", {_error: errorMessage}));
                 return Promise.reject();
                } 
            }
        
export default profileReducer;