import React from 'react'
import PropTypes from 'prop-types'

import '../styles/chat_images.scss'

export default function ChatImageView ({ images = [] }) {

  const renderedImages = images.map((image, i) => {
    return (
      <img src={image.src} key={i} alt={image.alt} />
    )
  })

  return (
    <div className='chat__images'>
      {renderedImages}
    </div>
  )
}

ChatImageView.propTypes = {
  images: PropTypes.array
}
