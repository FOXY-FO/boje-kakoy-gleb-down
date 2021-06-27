import React from 'react';
import s from './Post.module.css'
import ava from '../../../../img/ava.jpg'
import like from '../../../../img/like.png'
import dislike from '../../../../img/dislike.png'

const Post = (props) => {
    return (
        <div> 
            <img className="avatarImg" src={ava}  alt="Аватарка" />
            {props.date} , {props.message};
            <div className={s.appraisal}>
                <img src={like} alt=""/>
                <span className={s.likeCout}>{props.likeCout} Like</span>
                <img src={dislike} alt=""/>
                <span className={s.dislikeCout}> {props.dislikeCout} Dislike</span>
            </div>
        </div>
    )
}

export default Post;