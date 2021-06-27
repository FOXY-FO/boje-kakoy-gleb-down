const ADD_MESSAGE = 'ADD-MESSAGE';
let initialState = {
    dialogsData: [
        {id: "1", name: "Глеб", src: "https://archilab.online/images/1/123.jpg"},
        {id: "2", name: "Вася", src: "https://klike.net/uploads/posts/2019-03/1551511784_4.jpg"},
        {id: "3", name: "Ваня", src: "https://cs16planet.ru/steam-avatars/images/avatar1833.jpg"},
        {
            id: "4",
            name: "Михаил",
            src: "https://pm1.narvii.com/6889/74979d4d2744ec6e27995b6e866f091d04c0b40cr1-515-414v2_uhq.jpg"
        },
        {id: "5", name: "Камат", src: "https://pixelbox.ru/wp-content/uploads/2018/02/anonymous_steam_avatars-1-1.jpg"},
        {
            id: "6",
            name: "Анатолий",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRltvBEVwZUC1nI-q-4QnueJjvDFPOrHqBWig&usqp=CAU"
        }
    ],
    messageData: [
        {id: "1", name: {newMessage: "Првиет меня зовут Глеб"}},
        {id: "2", name:  {newMessage: "Ну ты можешь"}},
        {id: "3", name:  {newMessage: "Толя мне на тебя"}}
    ],

}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            return {
                ...state,
                messageData: [...state.messageData, {id: "6" , name: action.text }],
            };
        }
        default:
            return state;
    }
}

export const addMessageCreator = (text) => ({type: ADD_MESSAGE , text});

export default dialogsReducer;
