import React from 'react';
import classes from './FormControl.module.css';

export const FormControl = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={classes.error + " " + (hasError ? classes.control : "")}>
            <div>
               {props.types === "input" ? <input {...input} {...props} /> : <textarea {...input} {...props} />}
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}