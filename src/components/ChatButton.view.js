import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

export default function ChatButtonView ({ unreadMessageCount }) {

  const classes = ['header__button', 'header__button_chat']
  let text = <span>Chat</span>
  if(unreadMessageCount > 0){
    classes.push('header__button_chat--unread')
    text = <span> Chat <span class="header__button_chat__count">{unreadMessageCount}</span> Ungelesene Nachrichten </span>
  }

  return (
    <Link to="/chat" className={classes.join(' ')}>{text}</Link>
  )
}

ChatButtonView.propTypes = {
  unreadMessageCount: PropTypes.number
}
