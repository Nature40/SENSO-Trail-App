import React from 'react'
import PropTypes from 'prop-types'

import shuffle from '../utils/shuffleArray.js'

import '../styles/multiChoiceActivity.scss'

function MultiChoiceAnswer ({ id, text, onClick, reveal, choosen, correct }) {
  let classes = 'multi_choice_answer'
  if (choosen) {
    classes += ' multi_choice_answer--choosen'
    if (correct) {
      classes += ' multi_choice_answer--correct'
    } else {
      classes += ' multi_choice_answer--wrong'
    }
  } else if (reveal) {
    classes += ' multi_choice_answer--reveal'
    if (correct) {
      classes += ' multi_choice_answer--reveal_correct'
    } else {
      classes += ' multi_choice_answer--reveal_wrong'
    }
  }
  return (
    <button
      onClick={() => onClick(id)}
      className={classes}
    >
      {text}
      <span />
    </button>
  )
}
MultiChoiceAnswer.propTypes = {
  text: PropTypes.string,
  id: PropTypes.string,
  choosen: PropTypes.bool,
  correct: PropTypes.bool,
  reveal: PropTypes.bool,
  onClick: PropTypes.func
}

export default function MultiChoiceActivity ({
  activity,
  onChooseAnswer
}) {
  function onAnswerClicked (id) {
    if (!activity.reveal && !activity.answers[id].choosen) {
      onChooseAnswer(activity.uuid, id)
    }
  }
  return (
    <section className='activity multi_choice_activity'>
      <h3>{activity.name}</h3>
      <div className='multi_choice_activity__question'>
        {activity.question}
      </div>
      <div className='multi_choice_activity__answers'>
        {shuffle(Object.values(activity.answers)).map(a => <MultiChoiceAnswer key={a.id} reveal={activity.reveal} {...a} onClick={onAnswerClicked} />)}
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
  onChooseAnswer: PropTypes.func
}
