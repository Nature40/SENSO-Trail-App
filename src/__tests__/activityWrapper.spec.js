import React from 'react'
import { shallow } from 'enzyme'
import ActivityWrapper from '../components/activityWrapper.js'
import TextActivity from '../containers/textActivity.container.js'

import {
  ACTIVITY_TYPE_TEXT
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
})
