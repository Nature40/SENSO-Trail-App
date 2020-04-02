import React from 'react'
import PropTypes from 'prop-types'
import {SENDER_IS_PLAYER} from '../constants/chat.constants.js'

import '../styles/chat.scss'

export default function ChatMessageView ({ message, sender }) {
  const messageClasses = [
    'chat_message'
  ]
  let senderName = 'SENSI'

  if(sender === SENDER_IS_PLAYER){
    messageClasses.push('chat_message--own')
    senderName = '<SPIELERNAME>'
  } else {
    messageClasses.push('chat_message--others')
  }
  return (
    <div className={messageClasses.join(' ')}>
      <h5 className='chat_message__sender'>{senderName}</h5>
      <div className='chat_message__message'><p>{message}</p></div>
    </div>
  )
}

ChatMessageView.propTypes = {
  message: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired
}
