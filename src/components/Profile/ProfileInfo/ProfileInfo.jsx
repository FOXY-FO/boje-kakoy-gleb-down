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
                    <button onClick={props.changeEditMode}>???????????????? ??????????????</button>
                )}
                <div>
                    <div>
                        <span>?????? ????????????:</span> {!profile.lookingForAJob ? "??????" : "????"}
                    </div>
                    {profile.lookingForAJob && (
                        <div>
                            <span>???????????????? ????????????:</span>{" "}
                            {!profile.lookingForAJobDescription
                                ? "???????? ????????????????"
                                : profile.lookingForAJobDescription}
                        </div>
                    )}
                    <div>
                        <span>??????:</span> {profile.fullName}
                    </div>
                    <div>
                        <span>?????? ??????:</span>{" "}
                        {!profile.aboutMe ? "???????????????????? ??????" : profile.aboutMe}
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
