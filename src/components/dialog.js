import React from 'react'
import PropTypes from 'prop-types'

import '../styles/dialog.scss'

export default function Dialog ({ title, open, tools, children }) {
  let dialogClasses = 'dialog'
  if (!open) {
    dialogClasses += ' dialog--closed'
  }
  return (
    <div className={dialogClasses}>
      <div className='box'>
        <header>
          <h2>{title}</h2>
        </header>
        <div className='box__content'>
          {children}
        </div>
        <footer className='box__toolbar'>
          {tools}
        </footer>
      </div>
    </div>
  )
}

Dialog.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  tools: PropTypes.node,
  children: PropTypes.node
}
