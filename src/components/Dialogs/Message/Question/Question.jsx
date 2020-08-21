import React from 'react';
import classes from './Question.module.css';


const Question = (props) => {
    return (
        <div className={classes.title}>

            <div className={classes.item}></div>
            <div className>{props.question}</div>   

        </div>
    )
}

export default Question;
