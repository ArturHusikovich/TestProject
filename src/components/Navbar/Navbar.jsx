import React from 'react';
import classes from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import FriendsContainer from './Friends/FriendsContainer';

const Navbar = (props) => {

   return (
    <nav className={classes.nav}>
      <div className={classes.item}>
        <NavLink to='/profile' activeClassName={classes.activeLink}>Profile</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to='/dialogs' activeClassName={classes.activeLink}>Dialogs</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to='/users' activeClassName={classes.activeLink}>Users</NavLink>
      </div>
      
      <FriendsContainer />
    </nav>
  );
}

export default Navbar;