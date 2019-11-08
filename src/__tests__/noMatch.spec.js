import React from 'react'
import { shallow } from 'enzyme'
import NoMatch from '../components/noMatch.js'

/* eslint-env jest */

describe('<NoMatch>', () => {
  it('should render without crashing', () => {
    shallow(<NoMatch />)
  })
})
