import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

import CorrectSymbol from '../assets/correct.svg'


export default function ImageActivity ({
  activity,
  onViewImage
}) {
  if (!activity.completed) {
    onViewImage(activity.uuid)
  }
  return (
    <section className='activity text_activity card info_card'>
      <header>
        <h2>{activity.name} {activity.completed ? <img src={CorrectSymbol} alt='completed' /> : ''}</h2>
      </header>
      <div className="image_activity__image">
        <img src={activity.image.src} alt={activity.image.alt} />
      </div>
      <div className="info_card__content">
        <ReactMarkdown source={activity.text} />
      </div>
    </section>
  )
}

ImageActivity.propTypes = {
  activity: PropTypes.shape({
    text: PropTypes.string,
    uuid: PropTypes.string,
    open: PropTypes.bool,
    name: PropTypes.string,
    completed: PropTypes.bool,
    image: PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string
    })
  }),
  onViewImage: PropTypes.func,
}
