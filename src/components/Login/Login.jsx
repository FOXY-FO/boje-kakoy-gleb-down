import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControl";
import {required} from "../../Healpers/validator/validators";
import {connect} from "react-redux";
import {logIn} from "../../Redux/auth-reducer";
import {Redirect} from "react-router-dom";
import s from "./../common/FormsControls/FormsControl.module.css"

const LoginForm = ({handleSubmit, capthaUrl, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field type="text" name={"email"} placeholder={"Email"} validate={[required]} component={Input}/>
            </div>
            <div>
                <Field type="password" name={"password"} placeholder={"Password"} validate={[required]}
                       component={Input}/>
            </div>
            <div>
                <Field type={"checkbox"} name={"rememberMe"} component={Input}/>запомнить
            </div>
            {error && <div className={s.formSummaryError}>
                {error}
            </div>}
            <div>
                {capthaUrl && <img src={capthaUrl} alt=""/>}
            </div>
            <div>
                {capthaUrl && <Field type="text" name={"captcha"} placeholder={"символы"} validate={[required]}
                                     component={Input}/>}
            </div>
            <button>Войти</button>
        </form>
    )
}
const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);

const Login = ({isAuth, logIn, capthaUrl}) => {
    const onSubmit = (formData) => {
        logIn(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }
    if (isAuth) return <Redirect to="/profile"/>

    return <div>
        <h1>Login</h1>
        <LoginReduxForm capthaUrl={capthaUrl} onSubmit={onSubmit}/>
    </div>
}
const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        capthaUrl: state.auth.capthaUrl,
    }

}
export default connect(mapStateToProps, {logIn})(Login)