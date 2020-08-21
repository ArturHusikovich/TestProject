import React, { Suspense } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Route, withRouter} from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import {connect} from 'react-redux';
import { setInitializiedThunk } from './redux/appReducer';
import {compose} from 'redux';
import Preloader from './common/preloader/Preloader';

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const MessageContainer = React.lazy(() => import('./components/Dialogs/Message/MessageContainer'));

class App extends React.Component{
  componentDidMount() {
    this.props.setInitializiedThunk();
  } 
  render() {
    if(!this.props.initializied) {
      return <Preloader />
    }
      return (
   
    <div className='app-wrapper'>
      <HeaderContainer />
      <Navbar />

      <div className="app-wrapper-content">

        <Suspense fallback={<div>Загрузка...</div>}>
          <Route path='/profile/:userId?' render={ () => <ProfileContainer />} /> 
          <Route path='/dialogs' render={ () => <MessageContainer />} />
        </Suspense>

        <Route path='/users' render={ () => <UsersContainer />} />

        <Route path='/login' render={ () => <Login />} />
      
      </div>
    </div>

  );
}
}

let mapStateToProps = (state) =>  ({
  initializied: state.app.initializied
})

export default compose(
  withRouter,
  connect(mapStateToProps, {setInitializiedThunk} ) )(App);
