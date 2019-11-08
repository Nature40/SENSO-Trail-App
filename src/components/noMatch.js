import React from 'react'
import { ReactComponent as ForestSvg } from '../assets/simple-forest.svg'

import '../styles/noMatch.css'

const NoMatch = () => {
  return (
    <div className='page--404'>
      <h1>Das war die Falsche Abzweigung</h1>
      <ForestSvg />
      <p>Du scheinst dich ein wenig im Wald verrirrt zu haben. Diese Seite exisitiert leider nicht.</p>
      <p>Geh doch einfach nochmal eine Seite zurück und versuchs mit einer anderen Abzweigung.</p>
    </div>
  )
}

export default NoMatch
