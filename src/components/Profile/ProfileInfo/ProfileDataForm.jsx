import React from 'react';
import {Input, Textarea} from "../../common/FormsControls/FormsControl";
import {Field, reduxForm} from "redux-form";
import s from "../../common/FormsControls/FormsControl.module.css";

const ProfileDataForm = ({isFetching, profile, error, ...props}) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {error && <div className={s.formSummaryError}>
                {error}</div>}
            <div>
                <div><span>Ищу работу:</span>
                    <Field type={"checkbox"} name={"lookingForAJob"} component={Input}/>
                </div>

                <div><span>Описание работы:</span> <Field type={"textarea"} name={"lookingForAJobDescription"}
                                                          placeholder={"Мои профессиональные скилы..."}
                                                          component={Textarea}/>
                </div>
                <div>
                    <span>Имя:</span>
                    <Field type={"input"} name={"fullName"} placeholder={"Никнейм..."} component={Input}/>
                </div>
                <div>
                    <span>Обо мне:</span>
                    <Field type={"textarea"} name={"aboutMe"} placeholder={"Описание..."} component={Textarea}/>
                </div>
                <div>
                    {Object.keys(profile.contacts).map(key => {
                        return <div key={key}>
                            <b>{key}:</b> {<Field type={"input"} name={"contacts." + key.toString()} placeholder={key}
                                                  component={Input}/>}
                        </div>
                    })}
                </div>
            </div>
            <button>Сохранить изминения</button>
            <button onClick={props.backProfileData}>Назад</button>
        </form>
    )
}

const ProfileDataReduxForm = reduxForm({
    form: 'edit-profile'
})(ProfileDataForm);

export default ProfileDataReduxForm