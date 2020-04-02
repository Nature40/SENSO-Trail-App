import React, {useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import ChatMessageView from './ChatMessage.view.js'

import '../styles/chat.scss'

export default function ChatView ({messages, chatOptions}) {

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ block: 'end', behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages, chatOptions]);

  return (
    <div className="chat">
      <section className="message_board">
        { messages.map((m, idx) => <ChatMessageView key={idx} {...m} />)}
      </section>
      <div ref={messagesEndRef} />
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
