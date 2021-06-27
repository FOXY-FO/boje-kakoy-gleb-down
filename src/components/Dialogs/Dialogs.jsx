import React, { useState } from "react"
import s from "./Dialogs.module.css"
import Message from "./Message/Massage"
import DialogItem from "./DialogItem/DialogItem"
import { useDispatch, useSelector } from "react-redux"
import { getMessagePage } from "../../Redux/dialogs-selectors"
import { addMessageCreator } from "../../Redux/dialogs-reducer"
import { DialogFormReduxForm } from "./DialogsForm"

const Dialogs = () => {
  const messagePage = useSelector(getMessagePage)
  const dispatch = useDispatch()
  let [message, setMessage] = useState("")
  let messagesArray = messagePage.messageData.map((m) => (
    <Message key={m.id} {...m} />
  ))
  let dealogsArray = messagePage.dialogsData.map((d) => (
    <DialogItem key={d.id} {...d} />
  ))

  let addNewMessage = () => {
    dispatch(addMessageCreator(message))
  }

  const sendMessageState = (value) => {
    setMessage(value)
  }

  return (
    <div className={s.dialogs}>
      <div className={`${s.dialogsItem} `}>{dealogsArray}</div>
      <div className={`${s.dialogsMasseges} ${s.dialogsMassegesLocation}`}>
        {messagesArray}
        <DialogFormReduxForm
          onSubmit={addNewMessage}
          onChange={sendMessageState}
        />
      </div>
    </div>
  )
}

export default Dialogs
