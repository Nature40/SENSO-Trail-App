import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

import CorrectSymbol from '../assets/correct.svg'

import '../styles/textActivity.scss'

export default function TextActivity ({
  activity,
  onReadText,
  onCloseText
}) {
  if (!activity.open) {
    onReadText(activity.uuid)
  }
  return (
    <section className='activity text_activity card card_info'>
      <h2>{activity.name} {activity.completed ? <img src={CorrectSymbol} alt='completed' /> : ''}</h2>
      <div className="card_info_content">
        <ReactMarkdown source={activity.text} />
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
