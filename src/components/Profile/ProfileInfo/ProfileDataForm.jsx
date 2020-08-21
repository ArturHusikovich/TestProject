import React from 'react';
import {reduxForm, Field} from 'redux-form';
import { FormControl } from '../../../common/FormControl/FormControl';
import classes from './ProfileInfo.module.css';


const ProfileDataForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><button>Save</button></div>
            <div className={classes.error}>{props.error ? props.error : " "}</div>
                <div><b>Full Name:</b>
                    <Field component={FormControl} name={"fullName"} 
                           placeholder={"Full Name"} types="input" /></div>
                <div><b>Looking For A Job :</b>
                    <Field component="input"  name={"lookingForAJob"} type="checkbox" /> </div>
                <div><b>Skills:</b>
                    <Field component={FormControl} name={"lookingForAJobDescription"} 
                           placeholder={"Skills"} types="textarea" /></div>
                <div><b>About me:</b>
                    <Field component={FormControl} name={"aboutMe"} 
                           placeholder={"About me"} types="textarea" /></div>
                <div>
                  <b>Contacts:</b> {Object.keys(props.profile.contacts).map((key) => {
                  return <div key={key}>
                      <Field component={FormControl} name={"contacts." + key} 
                           placeholder={key} types="input" /> </div> } ) }
                </div>
        </form>
    )
}

const ReduxProfileDataForm = reduxForm({form: 'profile'})(ProfileDataForm);

export default ReduxProfileDataForm;