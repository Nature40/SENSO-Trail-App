import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default function TrailToolbar( 
  {
    trail,
    path,
    match
  }
){
  if(!trail) return (<div/>)

  const current = path.findIndex(
    (elem) => `/mytrail/${elem}` === match.url || `/mytrail${elem}` === match.url
  )
  return (
    <div className="toolbar">
      {current > 0 ? (<Link to={`/mytrail/${path[current-1]}`}>{'<'}</Link>) :''}
      <Link to="/mytrail">{trail.name}</Link>
      {current < path.length-1 ? <Link to={`/mytrail/${path[current+1]}`}>{'>'}</Link> : ''}
    </div>
  )
}

TrailToolbar.propTypes = {
  trail: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    uuid: PropTypes.string,
    stations: PropTypes.arrayOf(PropTypes.string)
  }),
  currentStation: PropTypes.shape({
    uuid: PropTypes.string,
    slug: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    activities: PropTypes.array
  }),
  nextStation: PropTypes.shape({
    uuid: PropTypes.string,
    slug: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    activities: PropTypes.array
  }),
  prevStation: PropTypes.shape({
    uuid: PropTypes.string,
    slug: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    activities: PropTypes.array
  })
}
