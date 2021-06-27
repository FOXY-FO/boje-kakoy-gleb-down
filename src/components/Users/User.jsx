import React from 'react';
import s from './Users.module.css'
import noImage from '../../img/noImage.jpg';
import {NavLink} from 'react-router-dom';

const User = ({user, followingInProgress,unfollowThunk,followThunk}) => {

    return <div>
            <div className={s.usersRow}>
                <div className={s.usersFollow}>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                            <img src={user.photos.small != null ? user.photos.small : noImage} alt="Картинка"
                                 className={s.usersPhoto}/>
                        </NavLink>
                    </div>
                    {user.followed ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={
                            () => {
                                unfollowThunk(user.id)
                            }}>Отписаться</button> :
                        <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            followThunk(user.id)
                        }}>Подписаться</button>}
                </div>
                <div className={s.usersInfo}>
                    <div>
                        <div className={s.usersFullName}>
                            {user.name}
                        </div>
                        <div>
                            {user.status}
                        </div>
                    </div>
                    <div>
                        <div className={s.userslocation}>"u.location.city",</div>
                        <div>"u.location.country"</div>
                    </div>
                </div>
            </div>
    </div>
}
export default User;