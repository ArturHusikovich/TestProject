import React from 'react';
import {reduxForm, Field} from 'redux-form';
import { required, maxLength } from '../../common/validators/validators';
import { FormControl } from '../../common/FormControl/FormControl';
import {connect} from 'react-redux';
import { LoginThunk } from '../../redux/authReducer';
import { Redirect } from 'react-router-dom';
import classes from './Login.module.css';

let maxLength50 = maxLength(50); 

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
                <div><Field component={FormControl} name={"email"} placeholder={"Login"} 
                            validate={[required, maxLength50]} types="input"/></div>

                <div><Field component={FormControl} name={"password"} type={"password"} placeholder={"Password"}
                            validate={[required, maxLength50]} types="input" /></div>
                
                <div>{props.error ? props.error : " "}</div>

                <div><Field component={"input"} name={"rememberMe"} type={"checkbox"} />Remember</div>
                <div><button>Send</button></div>

                {props.captcha && <img src={props.captcha} className={classes.captcha}/> }
                {props.captcha && <Field component={FormControl} name={"captcha"} placeholder={"Captcha"} 
                                         validate={[required, maxLength50]} types="input"/> }
 
        </form>
    )
}

const ReduxLoginForm = reduxForm({form: 'login'})(LoginForm);


const Login = (props) => {
    const onSubmit = (values) => {
        props.LoginThunk(values.email, values.password, values.rememberMe, values.captcha);
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }
        return (
        <div>
            <div>
                <h1>Please login!</h1>
            </div>
            <ReduxLoginForm onSubmit={onSubmit} captcha={props.captcha}/>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captcha: state.auth.captchaURL
    }
}
export default connect(mapStateToProps, {LoginThunk})(Login);