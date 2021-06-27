import React, { useCallback, useEffect } from "react"
import Profile from "./Profile"
import { useDispatch, useSelector } from "react-redux"
import { getStatus, getUsersProfileThunk } from "../../Redux/profile-reducer"
import { getIsFetching } from "../../Redux/users-selector"
import { useRouteMatch } from "react-router-dom"
import {
  getError,
  getProfile,
  getStatusSel,
} from "../../Redux/profile-selectors"
import { getAuthData } from "../../Redux/auth-selectors"

//React.Component расширяет базовый класс компоненты
const ProfileContainer = () => {
  const profile = useSelector(getProfile)
  const status = useSelector(getStatusSel)
  const error = useSelector(getError)
  const authData = useSelector(getAuthData)
  const isFetching = useSelector(getIsFetching)
  const match = useRouteMatch()
  const dispatch = useDispatch()

  const refreshProfile = useCallback(() => {
    //match (работа с url)
    let userId = match.params.userId
    if (!userId) {
      userId = authData
    }
    dispatch(getUsersProfileThunk(userId))
    dispatch(getStatus(userId))
  }, [authData, dispatch, match.params.userId])

  useEffect(() => {
    refreshProfile()
  }, [match.params.userId, refreshProfile])

  return (
    <Profile
      {...{
        profile,
        status,
        error,
        authData,
        isFetching,
      }}
      isOwner={!match.params.userId}
    />
  )
}

export default ProfileContainer
