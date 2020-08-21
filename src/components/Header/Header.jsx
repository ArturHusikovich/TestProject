import React from 'react';
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
   return (
    <header className={classes.header}>
        <img src="https://smartlogic.io/images/brand-assets/smartlogic-seal-teal-vector.svg"></img>
        
        <div className={classes.item}>
              {props.isAuth ? 
              <div>{props.email} <button onClick={props.LogoutThunk}>Log Out</button> </div> :
              <NavLink to={'/login'}>Login</NavLink> }
        </div>
    </header>
   );
}

export default Header;
