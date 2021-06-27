import { addPostCreator } from "../../../Redux/profile-reducer"
import MyPost from "./MyPost"
import { connect } from "react-redux"

let mapStateToProps = (state) => {
  return {
    postsData: state.profilePage.postsData,
    newPostText: state.profilePage.newPostText,
  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    addPostCreator: (newPostMessage) => {
      dispatch(addPostCreator(newPostMessage))
    },
  }
}

let MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPost)
export default MyPostContainer
