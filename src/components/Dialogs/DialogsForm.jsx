import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControl";
import {maxLengthCreator, required} from "../../Healpers/validator/validators";
import React from "react";

const maxLenght = maxLengthCreator(150);

const DialogForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} action="">
            <Field component={Textarea} validate={[required, maxLenght]} name={"newMessage"}
                   placeholder={"Напиши сообщение"} onChange={props.sendMessageState}/>
            <div>
                <button>Отправить сообщение</button>
            </div>
        </form>
    )
}
export const DialogFormReduxForm = reduxForm({
    form: 'message'
})(DialogForm);