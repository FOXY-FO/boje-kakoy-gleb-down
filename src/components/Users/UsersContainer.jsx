import { useDispatch, useSelector } from "react-redux"
import { requestUsers } from "../../Redux/users-reducer"
import React, { useEffect } from "react"
import { Users } from "./Users"
import { Preloader } from "../common/Preloader/Preloader"
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUserCount,
  getUsersSuperSelector,
} from "../../Redux/users-selector"

export const UsersContainer = () => {
  const dispatch = useDispatch()
  const users = useSelector(getUsersSuperSelector)
  const totalUserCount = useSelector(getTotalUserCount)
  const pageSize = useSelector(getPageSize)
  const currentPage = useSelector(getCurrentPage)
  const isFetching = useSelector(getIsFetching)
  const followingInProgress = useSelector(getFollowingInProgress)

  useEffect(() => {
    dispatch(requestUsers(currentPage, pageSize))
  }, []) // eslint-disable-line

  const onPageChanged = (number) => {
    dispatch(requestUsers(number, pageSize))
  }

  return (
    <>
      {isFetching ? <Preloader /> : null}
      <Users
        {...{
          users,
          totalUserCount,
          isFetching,
          followingInProgress,
          currentPage,
          pageSize,
        }}
        onPageChanged={onPageChanged}
      />
    </>
  )
}
