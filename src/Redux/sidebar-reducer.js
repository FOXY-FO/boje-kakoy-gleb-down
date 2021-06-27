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

const sidebarReducer = (state = initialState, action) => {
  return state
}

export default sidebarReducer
