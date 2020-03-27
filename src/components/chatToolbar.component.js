import React from 'react'
import PropTypes from 'prop-types'

export default function ChatToolbar({ onSendMessage, chatOptions }) {
  console.log(onSendMessage)
  const chooseFrom = chatOptions.map(option => {
    console.log(option)
    return (<button key={option.index} onClick={() => onSendMessage(option.index)}>{option.text}</button>)
  })
  return (
    <div className='toolbar'>
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
