import React from 'react'
import PropTypes from 'prop-types'

import {
  MESSAGE_TYPE_ERROR,
  MESSAGE_TYPE_LOG
} from '../constants/messages.constatns.js'

import '../styles/messages.scss'

export default function MessageDisplay ({ messages, onMessageRead }) {
  return (
    <div className='message_display'>
      {messages.map((m, idx) => (
        <div
          key={m.uuid}
          className={['card', 'message', messageTypeCss[m.messageType]].join(' ')}
          onClick={() => onMessageRead(m.uuid)}
        >{m.text}</div>
      ))}
    </div>
  )
}

MessageDisplay.propTypes = {
  message: PropTypes.arrayOf(
    PropTypes.shape({
      messageType: PropTypes.string,
      text: PropTypes.string
    })
  ),
  onMessageRead: PropTypes.func
}

const messageTypeCss = {
  [MESSAGE_TYPE_ERROR]: 'message--error',
  [MESSAGE_TYPE_LOG]: 'message--log'
}
