import React from 'react';
import s from './../Navbar.module.css';
import FriendItem from './FriensItem/FriendItem';

const Friends = (props) => {
    let friendsArray = props.sidebar.friendsData.map(el => <FriendItem key={el.id} name = {el.name} id={el.id} src={el.src}/>);

    return (
    <div>
        <div  className={`${s.item} ${s.friendsTitle}`}>Друзья</div>
        <div className={s.friendsRow}>
            {friendsArray}
        </div>
    </div>

)};

export default Friends;