import React from 'react'
import PropTypes from 'prop-types'

import {
  MESSAGE_TYPE_ERROR,
  MESSAGE_TYPE_LOG
} from '../constants/messages.constatns.js'

import '../styles/messages.scss'

export default function MessageDisplay ({messages}) {
  return (
    <div className="message_display ">
      {messages.map((m, idx) => (
          <div key={idx} className={['card','message', messageTypeCss[m.messageType]].join(' ')}>{m.text}</div>
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
  )
}

const messageTypeCss = {
  [MESSAGE_TYPE_ERROR]: 'message--error',
  [MESSAGE_TYPE_LOG]: 'message--log',
}
