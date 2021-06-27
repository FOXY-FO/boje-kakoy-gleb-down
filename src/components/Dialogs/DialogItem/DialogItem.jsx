import React from 'react';
import s from './../Dialogs.module.css';
import { NavLink } from 'react-router-dom';

const DialogItem = (props) => {

    return (
        <div className={`${s.dialogItemMasseges} ${s.dialogItemWrapper}`}>
            <img className="avatarImg" src={props.src} alt=""/>
            <NavLink to={`/dialogs/${props.id}`}>{props.name}</NavLink>
        </div>
    )}

export default DialogItem;