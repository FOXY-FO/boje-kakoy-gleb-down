import React from 'react';
import s from './MyPost.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../Healpers/validator/validators";
import {Textarea} from "../../common/FormsControls/FormsControl";

const maxLenght = maxLengthCreator(150);
const PostForm = (props) => {
    return (
        <form action="" onSubmit={props.handleSubmit}>
            <Field placeholder={"Коментарий..."}
                   name={"newPostMessage"}
                   component={Textarea}
                   validate={[required,maxLenght]}
            />
            <div>
                <button>Добавить пост</button>
            </div>
        </form>
    )
}
const PostFormReduxForm = reduxForm({
    form: 'postMessage'
})(PostForm);

const MyPost = (props) => {

    let postsArray =
        [...props.postsData].reverse().map(p => <Post key={p.id} {...p}/>);
    const addNewPost = (value) => {
        props.addPostCreator(value.newPostMessage);
    }
    return (
        <div className={s.posts}>
            <h3>My post</h3>
            <PostFormReduxForm onSubmit={addNewPost}/>
            <div>
                {postsArray}
            </div>
        </div>
    )
}
export default MyPost;