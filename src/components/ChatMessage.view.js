import React from 'react'
import PropTypes from 'prop-types'
import {SENDER_IS_PLAYER} from '../constants/chat.constants.js'

import ChatImageView from './ChatImage.view.js'

import '../styles/chat.scss'

export default function ChatMessageView ({ message, sender, tags={} }) {
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


  const myRef = React.createRef();
  let audio = ''
  if('audio' in tags){
    console.log("has audio")
    audio = (
      <audio ref={myRef} src={tags.audio} controls/>
      )
  }
  let images = []
  if( 'images' in tags ){
    images = tags.images;
  }
  return (
    <div className={messageClasses.join(' ')}>
      <h5 className='chat_message__sender'>{senderName}</h5>
      <div className='chat_message__message'>
        <p>{message}</p>
        {audio}
        <ChatImageView images={images} />
      </div>
    </div>
  )
}

ChatMessageView.propTypes = {
  message: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired
}
