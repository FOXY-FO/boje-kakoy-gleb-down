import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import Friends from './Friends/Friends';

const Navbar = (props) => {
    return (
    <div className={s.sidebar}>
        <nav className={s.nav}>
            <div className={s.item}><NavLink activeClassName={s.activeLink} to="/profile">Профиль</NavLink></div>
            <div className={s.item}><NavLink activeClassName={s.activeLink} to="/users">Друзья</NavLink></div>
            <div className={s.item}><NavLink activeClassName={s.activeLink} to="/dialogs">Сообщения</NavLink></div>
            <div className={s.item}><NavLink activeClassName={s.activeLink} to="/news">Новости</NavLink></div>
            <div className={`${s.item} ${s.item}`}>
                <NavLink activeClassName={s.activeLink} to="/musics">Музыка</NavLink>
            </div>
            <div className={s.item}><NavLink activeClassName={s.activeLink} to="/settings">Настройки</NavLink></div>
        </nav>
        <div>
            <div><Friends sidebar={props.state}/></div>
        </div>
    </div>
    )
}

export default Navbar;