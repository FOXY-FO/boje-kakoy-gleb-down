import React from 'react';
import logo from '../../img/google.png';
import h from './Header.module.css';
import {NavLink} from 'react-router-dom';


const Header = (props) => {

    return <header className={h.header}>
        <div>
            <img src={logo} alt="Логотип"/>
        </div>
        <div>
            {props.isAuth ? <div>{props.login}
                <button onClick={props.logout}>Выйти</button>
            </div> : <NavLink
                to='/'>Войти</NavLink>}
        </div>
    </header>
}

export default Header;