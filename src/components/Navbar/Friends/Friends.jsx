import React from 'react';
import classes from './Friends.module.css';
import Friend from './Friend/Friend';

const Friends = (props) => {

let friendselem = 
props.friends.map( (elem) => <Friend name={elem.name}/>)

    return (
        <div>
            <div className={classes.fr}>Friends</div>
            <div className={classes.friends}>
                {friendselem}
            </div>
        </div>
    )
}

export default Friends;
