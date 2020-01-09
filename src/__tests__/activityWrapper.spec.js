import React from 'react'
import { shallow } from 'enzyme'
import ActivityWrapper from '../components/activityWrapper.js'
import TextActivity from '../containers/textActivity.container.js'
import ImageActivity from '../containers/imageActivity.container.js'
import MultiChoiceActivity from '../containers/multiChoiceActivity.container.js'

import {
  ACTIVITY_TYPE_TEXT,
  ACTIVITY_TYPE_IMAGE,
  ACTIVITY_TYPE_MULTI_CHOICE
} from '../constants/activity.constants.js'

/* eslint-env jest */

describe('<ActivityWrapper>', () => {
  it('should render without crashing', () => {
    const props = {
      activityType: '',
      uuid: ''
    }
    shallow(<ActivityWrapper {...props} />)
  })

  it('should render TextActivity if activityType is ACTIVITY_TYPE_TEXT', () => {
    const props = {
      activityType: ACTIVITY_TYPE_TEXT,
      uuid: 'uuid1'
    }
    const wrapper = shallow(<ActivityWrapper {...props} />)
    expect(wrapper.matchesElement(<TextActivity uuid='uuid1' />)).toEqual(true)
  })

  it('should render ImageActivity if activityType is ACTIVITY_TYPE_IMAGE', () => {
    const props = {
      activityType: ACTIVITY_TYPE_IMAGE,
      uuid: 'uuid1'
    }
    const wrapper = shallow(<ActivityWrapper {...props} />)
    expect(wrapper.matchesElement(<ImageActivity uuid='uuid1' />)).toEqual(true)
  })

  it('should render MultiChoiceActivity if activityType is ACTIVITY_TYPE_MULTI_CHOICE', () => {
    const props = {
      activityType: ACTIVITY_TYPE_MULTI_CHOICE,
      uuid: 'uuid1'
    }
    const wrapper = shallow(<ActivityWrapper {...props} />)
    expect(wrapper.matchesElement(<MultiChoiceActivity uuid='uuid1' />)).toEqual(true)
  })
})
