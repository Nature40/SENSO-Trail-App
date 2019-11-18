import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

import '../styles/textActivity.scss'

export default function TextActivity ({
  activity,
  onReadText,
  onCloseText
}) {
  let contentClass = 'text_activity__content'
  let button = (
    <button
      id={'open_text--' + activity.uuid}
      onClick={() => onReadText(activity.uuid)}
    >
    Text öffnen
    </button>
  )
  if (activity.open) {
    contentClass += ' text_activity__content--open'
    button = (
      <button
        id={'close_text--' + activity.uuid}
        onClick={() => onCloseText(activity.uuid)}
      >
      Text schließen
      </button>
    )
  }
  return (
    <section className='activity text_activity'>
      <h3>{activity.name}</h3>
      <div className={contentClass}>
        {(activity.open ? <ReactMarkdown source={activity.text} /> : '')}
      </div>
      <div className='text_activity__tools'>
        {button}
      </div>
    </section>
  )
}

TextActivity.propTypes = {
  activity: PropTypes.shape({
    text: PropTypes.string,
    uuid: PropTypes.string,
    open: PropTypes.bool,
    name: PropTypes.string
  }),
  onReadText: PropTypes.func,
  onCloseText: PropTypes.func
}
