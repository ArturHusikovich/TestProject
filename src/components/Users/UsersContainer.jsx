import React from 'react';
import {connect} from 'react-redux';
import Users from './Users';
import { setTotalUsersCount, setIsFetching, toggleFollowingProgress,
         getUsersThunk, setCurrentPageThunk, followThunk, unfollowThunk} from '../../redux/usersReducer';
import Preloader from '../../common/preloader/Preloader';
import { getUsersSelector, getCurrentPageSelector, getPageSizeSelector,
         getTotalUsersSelector, getIsFetchingSelector, getIsProgressingArrSelector } from '../../redux/usersSelectors';

class UsersContainer extends React.Component {
    constructor (props) {     
        super(props);
        }
    
    componentDidMount () { 
        this.props.getUsersThunk(this.props.currentPage, this.props.pagSize);
    }

    onCurrentPageChange = (page) => {
        this.props.setCurrentPageThunk(page, this.props.pageSize);       
    }
   
    render() {
        return <>
                    {this.props.isFetching ?  <Preloader /> : null}
                    <Users totalUsers={this.props.totalUsers}
                                pageSize={this.props.pageSize}
                                currentPage={this.props.currentPage}
                                onCurrentPageChange={this.onCurrentPageChange}
                                users={this.props.users}
                                followThunk={this.props.followThunk}
                                unfollowThunk={this.props.unfollowThunk}
                                toggleFollowingProgress={this.props.toggleFollowingProgress}
                        isProgressingArr={this.props.isProgressingArr}/>
               </>
    }
}


let mapStateToProps = (state) => {
    return {
        users: getUsersSelector(state),
        currentPage: getCurrentPageSelector(state),
        pageSize: getPageSizeSelector(state),
        totalUsers: getTotalUsersSelector(state),
        isFetching: getIsFetchingSelector(state),
        isProgressingArr: getIsProgressingArrSelector(state)
    }
}

export default connect(mapStateToProps, {setTotalUsersCount, setIsFetching, toggleFollowingProgress, 
               getUsersThunk, setCurrentPageThunk, followThunk, unfollowThunk}) (UsersContainer);

