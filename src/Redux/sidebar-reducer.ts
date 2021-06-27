let initialState = {
  friendsData: [
    { id: "1", name: "Глеб", src: "https://archilab.online/images/1/123.jpg" },
    {
      id: "2",
      name: "Вася",
      src: "https://klike.net/uploads/posts/2019-03/1551511784_4.jpg",
    },
    {
      id: "3",
      name: "Ваня",
      src: "https://cs16planet.ru/steam-avatars/images/avatar1833.jpg",
    },
  ],
}

type TInitialState = typeof initialState

const sidebarReducer = (state = initialState, action: any): TInitialState => {
  switch (action.type) {
    default:
      return state
  }
}

export default sidebarReducer
