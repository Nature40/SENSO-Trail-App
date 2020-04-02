import React from 'react'
import PropTypes from 'prop-types'

export default function ChatToolbar({ onSendMessage, chatOptions }) {
  const chooseFrom = chatOptions.map(option => {
    return (
      <button
        key={option.index} 
        className='chat_toolbar__option'
        onClick={() => onSendMessage(option.index)}
      >{option.text}</button>)
  })
  return (
    <div className='toolbar chat_toolbar'>
      {chooseFrom}
    </div>
  )
}

ChatToolbar.propTypes = {
  onSendMessage: PropTypes.func,
  chatOptions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      index: PropTypes.number
    })
  )
}
