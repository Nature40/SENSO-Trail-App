import React from 'react'
import PropTypes from 'prop-types'
import {SENDER_IS_PLAYER} from '../constants/chat.constants.js'

import '../styles/chat.scss'

export default function ChatMessageView ({message, sender}) {
  const message_classes = [
    'chat_message'
  ]

  if(sender === SENDER_IS_PLAYER){
    message_classes.push('chat_message--own')
  } else {
    message_classes.push('chat_message--others')
  }
  return (
    <div className={message_classes.join(' ')}>
      <h5 className="chat_message__sender">{sender}</h5>
      <div className="chat_message__message"><p>{message}</p></div>
    </div>
  )
}

ChatMessageView.propTypes = {
  message: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired
}
