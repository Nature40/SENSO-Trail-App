import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

import CorrectSymbol from '../assets/correct.svg'

import '../styles/textActivity.scss'

export default function TextActivity ({
  activity,
  onReadText
}) {
  if (!activity.completed) {
    onReadText(activity.uuid)
  }
  return (
    <section className='activity text_activity card info_card'>
      <header>
        <h2>{activity.name} {activity.completed ? <img src={CorrectSymbol} alt='completed' /> : ''}</h2>
      </header>
      <div className="info_card__content">
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
    name: PropTypes.string,
    completed: PropTypes.bool
  }),
  onReadText: PropTypes.func,
}
