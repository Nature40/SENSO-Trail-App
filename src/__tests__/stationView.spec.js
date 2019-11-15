import React from 'react'
import { shallow } from 'enzyme'
import StationView from '../components/stationView.js'

/* eslint-env jest */

describe('<StationView>', () => {
  it('should render without crashing', () => {
    shallow(<StationView />)
  })
})
