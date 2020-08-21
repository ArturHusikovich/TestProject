import { usersAPI} from '../api/api';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE='SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_ISFETCHING = 'SET_ISFETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS';

let initialState = {
    users: [ ],
    totalUsers: 0,
    currentPage: 1,
    pageSize: 10,
    isFetching: false,
    isProgressingArr: [ ]
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                }),
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                }),
            }
        case SET_USERS: 
             return {
            ...state,
            users: action.users
        }
        case SET_CURRENT_PAGE: 
             return {
                 ...state,
                 currentPage: action.page
             }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsers: action.count
            }
        case SET_ISFETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...state,
                isProgressingArr: action.isProgressing 
                                  ? [...state.isProgressingArr, action.userId] 
                                  :state.isProgressingArr.filter(id => id != action.userId)
            }

        default:
            return state;
    }
}


export const follow = (userId) => {
    return { type: FOLLOW, userId };
}

export const unfollow = (userId) => {
    return { type: UNFOLLOW, userId };
}

export const setUsers = (users) => {
    return { type: SET_USERS, users};
}

export const setCurrentPage = (page) => {
    return {type: SET_CURRENT_PAGE, page};
}

export const setTotalUsersCount = (count) => {
    return {type: SET_TOTAL_USERS_COUNT, count}
}

export const setIsFetching = (isFetching) => {
    return { type: SET_ISFETCHING, isFetching}
}

export const toggleFollowingProgress = (isProgressing, userId) => {
    return { type: TOGGLE_FOLLOWING_PROGRESS, isProgressing, userId}
}


export const getUsersThunk = (currentPage, pageSize) => async (dispatch) => {
    dispatch(setIsFetching(true));
    let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(setIsFetching(false));
        dispatch(setUsers(data.items));    
        dispatch(setTotalUsersCount(data.totalCount))                     
    }  
     
export const setCurrentPageThunk = (page, pageSize) => async (dispatch) => {
    dispatch(setCurrentPage(page));
    dispatch(setIsFetching(true));
    let data = await usersAPI.getUsers(page, pageSize) 
        dispatch(setIsFetching(false));
        dispatch(setUsers(data.items));                          
    } 

export const followUnfollowUni = async (dispatch, userId, apiMethod, actionCreator) => {
        dispatch(toggleFollowingProgress(true, userId));        //erku f-ic stcanq meky, vor chkrknvi kody
        let data = await apiMethod(userId);
        if(data.resultCode == 0){
            dispatch(actionCreator(userId));
            }   
            dispatch(toggleFollowingProgress(false, userId));      
        } 

export const followThunk = (userId) => async (dispatch) => {
    followUnfollowUni(dispatch, userId, usersAPI.followUser.bind(usersAPI), follow)
    }  

export const unfollowThunk = (userId) => async (dispatch) => {
    followUnfollowUni(dispatch, userId, usersAPI.unfollowUser.bind(usersAPI), unfollow)
    
}

export default usersReducer;
