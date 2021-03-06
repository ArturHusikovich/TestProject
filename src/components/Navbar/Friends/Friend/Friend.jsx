import React from 'react';
import classes from './Friend.module.css';
import { NavLink } from 'react-router-dom';


const Friend = (props) => {
    return (
        <div className={classes.item}>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR_B27-r1VBmqEdMqSnN8IM1aFIXj8-IlCGB0-k_q1A39KELWcM&usqp=CAU'></img>
            <NavLink to='/friends' activeClassName={classes.activeLink}>
                {props.name}
            </NavLink>
        </div>
    )
}
export default Friend;