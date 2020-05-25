import React from 'react'
import PropTypes from 'prop-types'

import '../styles/chat_images.scss'

export default function ChatImageView ({ images = [] }) {

  const renderedImages = images.map((src, i) => {
    return (
      <img src={src} key={i} />
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
