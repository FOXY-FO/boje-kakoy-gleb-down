import profileReducer from './profile-reducer';
import dialogsReducer from "./dialogs-reducer";

export let store = {
    _callSubscriber() {},
    _state:{
        messagePage: {
            dialogsData : [
                {id:"1", name:"Глеб" , src: "https://archilab.online/images/1/123.jpg"},
                {id:"2", name:"Вася" , src: "https://klike.net/uploads/posts/2019-03/1551511784_4.jpg"},
                {id:"3", name:"Ваня" , src: "https://cs16planet.ru/steam-avatars/images/avatar1833.jpg"},
                {id:"4", name:"Михаил" , src: "https://pm1.narvii.com/6889/74979d4d2744ec6e27995b6e866f091d04c0b40cr1-515-414v2_uhq.jpg"},
                {id:"5", name:"Камат" , src: "https://pixelbox.ru/wp-content/uploads/2018/02/anonymous_steam_avatars-1-1.jpg"},
                {id:"6", name:"Анатолий" , src: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRltvBEVwZUC1nI-q-4QnueJjvDFPOrHqBWig&usqp=CAU"}
            ],
            messageData : [
                {id: "1" , name:"Првиет меня зовут Глеб"},
                {id: "2" , name:"Ну ты можешь пойти нахуй"},
                {id: "3" , name:"Толя мне похуй на тебя"}
            ],
            newMessageText: "",
        },
        profilePage: {
            postsData : [
                {id: 1 ,likeCout:"57", dislikeCout:"12", date:"31.08.2020", message:"Наконец я начал учить реакт"},
                {id: 2 ,likeCout:"10432", dislikeCout:"1", date:"22.06.2000", message:"Толя кусок тупого дерьма"}
            ],
            newPostText: ""
        },
        sidebar: {
            friendsData: [
                {id:"1", name:"Глеб" , src: "https://archilab.online/images/1/123.jpg"},
                {id:"2", name:"Вася" , src: "https://klike.net/uploads/posts/2019-03/1551511784_4.jpg"},
                {id:"3", name:"Ваня" , src: "https://cs16planet.ru/steam-avatars/images/avatar1833.jpg"}
            ]
        }
    },
    subscriber(observer){
        this._callSubscriber = observer;
    },
    getState() {
        return this._state;
    },
    dispatch(action){
            this._state.profilePage = profileReducer(this._state.profilePage,action);
            this._state.messagePage = dialogsReducer(this._state.messagePage,action);
            this._callSubscriber(this._state);
    },
}
