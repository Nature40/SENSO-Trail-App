import React from 'react'
import { shallow } from 'enzyme'
import { ScoreCounter } from '../components/scoreCounter.js'

/* eslint-env jest */

describe('<ScoreCounter>', () => {
  it('should render without crashing', () => {
    const props = {
      score: 0,
      isActive: true
    }
    shallow(<ScoreCounter {...props} />)
  })
  it('should render the score', () => {
    const props = {
      score: 100,
      isActive: true
    }
    const wrapper = shallow(<ScoreCounter {...props} />)

    expect(wrapper.find('.score-value')).toHaveLength(1)
    expect(wrapper.find('.score-value').text()).toEqual('100')
  })
  it('should render nothing if not active', () => {
    const props = {
      score: 0,
      isActive: false
    }
    const wrapper = shallow(<ScoreCounter {...props} />)

    expect(wrapper.find('.score-value')).toHaveLength(0)
    expect(wrapper.html()).toEqual(null)
  })
})
