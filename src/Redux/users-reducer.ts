import { usersAPI } from "../api/api"

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET-USERS"
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE"
const SET_USERS_TOTAL_COUNT = "SET-USERS-TOTAL-COUNT"
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING"
const TOGGLE_FOLLOWING_IN_PROGRESS = "TOGGLE-FOLLOWING-IN-PROGRESS"

type TUser = {
  id: string | number
  name: string
}

let initialState = {
  users: [] as TUser[],
  pageSize: 15,
  totalUserCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as boolean[],
}

const usersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FOLLOW: {
      return {
        ...state,
        users: state.users.map((u) => {
          if (action.userId === u.id) return { ...u, followed: true }
          else return { ...u }
        }),
      }
    }
    case UNFOLLOW: {
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) return { ...u, followed: false }
          else return { ...u }
        }),
      }
    }
    case SET_USERS: {
      return {
        ...state,
        users: action.users,
      }
    }
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentNumber,
      }
    }
    case SET_USERS_TOTAL_COUNT: {
      return {
        ...state,
        totalUserCount: action.totalCount,
      }
    }
    case TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching,
      }
    }
    case TOGGLE_FOLLOWING_IN_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : [state.followingInProgress.filter((id) => id !== action.userId)],
      }
    }
    default:
      return state
  }
}
//функция которая является одновременно обьектом AC
export const follow = (userId: string | number) => ({ type: FOLLOW, userId })
export const unfollow = (userId: string | number) => ({
  type: UNFOLLOW,
  userId,
})
export const setUsers = (users: string | number) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentNumber: number) => ({
  type: SET_CURRENT_PAGE,
  currentNumber,
})
export const setUsersTotalCount = (totalCount: number) => ({
  type: SET_USERS_TOTAL_COUNT,
  totalCount,
})
export const toggleIsFetching = (isFetching: boolean) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
})
export const toggleFollowingInProgress = (
  isFetching: boolean,
  userId: number
) => ({
  type: TOGGLE_FOLLOWING_IN_PROGRESS,
  userId,
  isFetching,
})

export const requestUsers = (page: number, pageSize: number) => {
  return async (dispatch: any) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))
    let data = await usersAPI.getUsers(page, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setUsersTotalCount(data.totalCount))
  }
}
export const followUnfollowFlow = async (
  dispatch: any,
  userId: number,
  apiMethod: (userId: number | string) => any,
  actionCreater: (userId: number | string) => object
) => {
  dispatch(toggleFollowingInProgress(true, userId))
  let response = await apiMethod(userId)
  if (response.data.resultCode === 0) {
    dispatch(actionCreater(userId))
    dispatch(toggleFollowingInProgress(false, userId))
  }
}
export const followThunk = (userId: number) => {
  return (dispatch: any) => {
    followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), follow)
  }
}
export const unfollowThunk = (userId: number) => {
  return (dispatch: any) => {
    followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.unfollow.bind(usersAPI),
      unfollow
    )
  }
}

export default usersReducer
