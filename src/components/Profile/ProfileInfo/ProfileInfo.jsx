import React, {useState} from "react";
import s from "./ProfileInfo.module.css";
import {Preloader} from "../../common/Preloader/Preloader";
import noAvatar from "../../../img/noavatar.png";
import {ProfileStatusHooks} from "./ProfileStatusHooks";
import ProfileDataForm from "./ProfileDataForm";
import {useDispatch} from "react-redux";
import {setStatus} from "../../../Redux/profile-reducer";

const ProfileInfo = ({status, error, ...props}) => {
    const [editMode, setEditMode] = useState(false);
    const dispatch = useDispatch();
    if (!props.profile || props.isFetching) {
        return <Preloader/>;
    }
    const onMainPhotoSelected = (e) => {
        let path = e.target.files[0];
        if (path) {
            props.savePhoto(path);
        }
    };
    const onSubmit = (formData) => {
        props.saveProfile(formData).then(() => {
            setEditMode(false);
        });
    };
    return (
        <div>
            <div>
                <ProfileStatusHooks
                    status={status}
                    setStatus={(status) => dispatch(setStatus(status))}
                    isOwner={props.isOwner}
                    error={error}
                />
            </div>
            <div>
                <img src={props.profile.photos.large || noAvatar} alt=""/>
            </div>
            {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
            {!editMode ? (
                <ProfileData
                    profile={props.profile}
                    isOwner={props.isOwner}
                    changeEditMode={() => {
                        setEditMode(true);
                    }}
                />
            ) : (
                <ProfileDataForm
                    backProfileData={() => setEditMode(false)}
                    profile={props.profile}
                    initialValues={props.profile}
                    onSubmit={onSubmit}
                />
            )}
        </div>
    );
};

const ProfileData = ({profile, ...props}) => {
    return (
        <div className={s.description}>
            <div>
                {props.isOwner && (
                    <button onClick={props.changeEditMode}>Изменить профиль</button>
                )}
                <div>
                    <div>
                        <span>Ищу работу:</span> {!profile.lookingForAJob ? "Нет" : "Да"}
                    </div>
                    {profile.lookingForAJob && (
                        <div>
                            <span>Описание работы:</span>{" "}
                            {!profile.lookingForAJobDescription
                                ? "Нету описания"
                                : profile.lookingForAJobDescription}
                        </div>
                    )}
                    <div>
                        <span>Имя:</span> {profile.fullName}
                    </div>
                    <div>
                        <span>Обо мне:</span>{" "}
                        {!profile.aboutMe ? "информации нет" : profile.aboutMe}
                    </div>
                    <div>
                        {Object.keys(profile.contacts).map((key) => {
                            return (
                                <Contact
                                    key={key}
                                    contactTitle={key}
                                    contactValue={profile.contacts[key]}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Contact = ({contactTitle, contactValue}) => {
    return (
        contactValue && (
            <div>
                {contactTitle} : {contactValue}
            </div>
        )
    );
};

export default ProfileInfo;
