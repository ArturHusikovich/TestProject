import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {LogoutThunk} from '../../redux/authReducer';

class HeaderContainer extends React.Component {
    
    render () {
        return <Header {...this.props} />
    }
}

let mapStateToProps = (state) => ({
    email: state.auth.email,
    isAuth: state.auth.isAuth
});


export default connect(mapStateToProps, {LogoutThunk}) (HeaderContainer);