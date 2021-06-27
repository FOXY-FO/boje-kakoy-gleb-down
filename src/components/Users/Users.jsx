import React from 'react';
import {Paginator} from "../common/Paginator/Paginator";
import User from "./User";
import {useDispatch} from "react-redux";
import {followThunk, unfollowThunk} from "../../Redux/users-reducer";

export const Users = (props) => {
    const dispatch = useDispatch();
    return <div>
        <Paginator {...props}/>
        <div>
            {
                props.users.map(u => <User user={u} followingInProgress={props.followingInProgress}
                                           unfollowThunk={(userId) => dispatch(unfollowThunk(userId))}
                                           followThunk={(userId) => dispatch(followThunk(userId))} key={u.id}/>)
            }
        </div>
    </div>
}
