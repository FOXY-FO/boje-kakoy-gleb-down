import React from 'react'
import s from './../../Navbar.module.css'
import { NavLink } from 'react-router-dom';
const FriendItem = (props) =>{
    
    return(
        <div className={s.FriendItemRow}>
            <NavLink to={`/dialogs/${props.id}`}>
                <img className="avatarImg" src={props.src} alt=""/>
                <div> {props.name} </div>   
            </NavLink>
        </div>
    )
}

export default FriendItem;