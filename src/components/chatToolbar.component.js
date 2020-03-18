import React from 'react'
import PropTypes from 'prop-types'

export default function ChatToolbar({onSendMessage}){
  console.log(onSendMessage)
  return (
    <div className="toolbar">
      <button onClick={() => onSendMessage('Hallo Welt', testSender())}>TEST SEND</button>
    </div>
  )
}

ChatToolbar.propTypes = {
  onSendMessage: PropTypes.func
}

function testSender() {
  const x = Math.random()
  if(x <= 0.5) {
    return 'SENDER_IS_PLAYER'
  } else {
    return 'OTHER'
  }
}
