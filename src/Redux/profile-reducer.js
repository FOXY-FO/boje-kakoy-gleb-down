import {profileAPI} from "../api/api";
import {toggleIsFetching} from "./users-reducer";
import {stopSubmit} from "redux-form";
import {catchError} from "../Healpers/catchErorr/catchErorr";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const SAVE_PHOTO_SUCSESS = 'SAVE-PHOTO-SUCSESS';
const CATCH_ERROR_SERVER = 'CATCH_ERROR_SERVER';

let initialState = {
    postsData: [
        {id: 1, likeCout: "57", dislikeCout: "12", date: "31.08.2020", message: "Наконец я начал учить реакт"},
        {id: 2, likeCout: "10432", dislikeCout: "1", date: "22.06.2000", message: "Толя кусок тупого дерьма"}
    ],
    profile: null,
    status: "",
    error: null,
}
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newElementItem = {
                id: 5,
                message: action.newPostMessage,
                likeCout: "80",
                dislikeCout: "1",
                date: "Нету ее"
            }
            return {
                ...state,
                postsData: [...state.postsData, newElementItem],
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }
        case CATCH_ERROR_SERVER: {
            return {
                ...state,
                error: action.error
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        case SAVE_PHOTO_SUCSESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            };
        }
        default:
            return state;
    }
}
export const addPostCreator = (newPostMessage) => ({type: ADD_POST, newPostMessage});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setProfileStatus = (status) => ({type: SET_STATUS, status: status});
export const savePhotoSucsess = (photos) => ({type: SAVE_PHOTO_SUCSESS, photos});
export const catchErrorServer = (error) => ({type: CATCH_ERROR_SERVER, error});

export const getUsersProfileThunk = (userId) => async (dispatch) => {
    let response = await profileAPI.getUsersProfile(userId);
    dispatch(setUserProfile(response.data));
}
export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setProfileStatus(response.data));
}
export const setStatus = (status) => async (dispatch) => {
    try{
        let response = await profileAPI.setStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setProfileStatus(status));
        }
        else if(response.data.resultCode === 1){
            dispatch(catchErrorServer(response.data.messages));
            setTimeout(()=>dispatch(catchErrorServer(null)), 6000);
        }
    } catch (error) {
        const errorStatus = catchError(error.response.status);
        dispatch(catchErrorServer(errorStatus));
        setTimeout(()=>dispatch(catchErrorServer(null)), 6000);
    }

}
export const savePhoto = (file) => async (dispatch) => {
    try {
        dispatch(toggleIsFetching(true));
        let response = await profileAPI.savePhoto(file);
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSucsess(response.data.data.photos));
            dispatch(toggleIsFetching(false));
        }

    } catch (e) {
        dispatch(toggleIsFetching(false));
        alert("Силшком мног запросов"); // undefined
    }
}
export const saveProfile = (profile) => async (dispatch, getState) => {
    try {
        dispatch(toggleIsFetching(true));
        const userId = getState().auth.id;
        const response = await profileAPI.saveProfile(profile);
        if (response.data.resultCode === 0) {
            dispatch(getUsersProfileThunk(userId));
            dispatch(toggleIsFetching(false));
        } else {
            dispatch(toggleIsFetching(false));
            dispatch(stopSubmit("edit-profile", {_error: response.data.messages}));
            //Promise (успешно или не успешно)
            //Promise.reject не успешно возвращает сообщение
            return Promise.reject(response.data.messages);
        }

    } catch (e) {
        dispatch(toggleIsFetching(false));
        alert("Силшком много запросов"); // undefined
    }
}
export default profileReducer;

