import {createSelector} from 'reselect';

const getUsers = (state) => {
    return state.usersPage.users;
}
export const getUsersSelector = createSelector(getUsers, (users) => { //keshiruet dannie users
    return users.filter(u => true); //keshiruet rezultat
})

export const getCurrentPageSelector = (state) => {
    return state.usersPage.currentPage;
}
export const getPageSizeSelector = (state) => {
    return state.usersPage.pageSize;
}
export const getTotalUsersSelector = (state) => {
    return state.usersPage.totalUsers;
}
export const getIsFetchingSelector = (state) => {
    return state.usersPage.isFetching;
}
export const getIsProgressingArrSelector = (state) => {
    return state.usersPage.isProgressingArr;
}


