import React from 'react';
import s from './Content.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostContainer from "./MyPost/MyPostContainer";
import {useDispatch} from "react-redux";
import {savePhoto, saveProfile} from "../../Redux/profile-reducer";

const Profile = (props) => {
    const dispatch = useDispatch();
    return <div className={s.content}>
        <ProfileInfo savePhoto={(path) => dispatch(savePhoto(path))}
                     saveProfile={(formData) => dispatch(saveProfile(formData))} {...props}
        />
        <MyPostContainer/>
    </div>
}

export default Profile;