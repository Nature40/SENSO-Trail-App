import React, {useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import ChatMessageView from './ChatMessage.view.js'

import '../styles/chat.scss'

export default function ChatView ({messages, chatOptions, lastReadIndex, markMessagesRead}) {

  const messagesEndRef = useRef(null)

  const scrollToLastRead = () => {
    if(messagesEndRef.current.children.length > 0){
    messagesEndRef.current.children[lastReadIndex].scrollIntoView({ block: 'end', behavior: "smooth" })
    }
    if(lastReadIndex < (messages.length - 1)) {
      markMessagesRead(messages.length - 1)
    }
  }

  useEffect(scrollToLastRead, [messages, chatOptions]);

  return (
    <div className="chat">
      <section ref={messagesEndRef} className="message_board">
        { messages.map((m, idx) => <ChatMessageView key={idx} {...m} />)}
      </section>
    </div>
  )
}

ChatView.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string,
      sender: PropTypes.string
    })
  )
}
