import React from 'react'
import PropTypes from 'prop-types'

import shuffle from '../utils/shuffleArray.js'

import '../styles/multiChoiceActivity.scss'

function MultiChoiceAnswer ({ id, text, onClick }) {
  return (
    <button
      onClick={() => onClick(id)}
      className='multi_choice_answer'
    >
      {text}
    </button>
  )
}
MultiChoiceAnswer.propTypes = {
  text: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func
}

export default function MultiChoiceActivity ({
  activity
}) {
  function dummy (id) {
    console.log('clicked answer: ' + id)
    console.log((activity.answers[id].correct ? 'RICHTIGE ANWORT': 'FALSCHE ANTWORT'))
  }
  return (
    <section className='activity multi_choice_activity'>
      <h3>{activity.name}</h3>
      <div className='multi_choice_activity__question'>
        {activity.question}
      </div>
      <div className='multi_choice_activity__answers'>
        {shuffle(Object.values(activity.answers)).map(a => <MultiChoiceAnswer key={a.id} {...a} onClick={dummy} />)}
      </div>
    </section>
  )
}

MultiChoiceActivity.propTypes = {
  activity: PropTypes.shape({
    question: PropTypes.string,
    uuid: PropTypes.string,
    name: PropTypes.string,
    answers: PropTypes.object
  }),
  onReadText: PropTypes.func,
  onCloseText: PropTypes.func
}
