import React from 'react'
import { shallow } from 'enzyme'
import {TrailInfoView }from '../components/trailView.js'

import ReactMarkdown from 'react-markdown'

/* eslint-env jest */

describe('<TrailInfoView>', () => {
  it('should render without crashing', () => {
    const props = {
      trail: {
        uuid: 'uuid1',
        description: 'test text',
        name: 'test trail',
        stations: []
      }
    }
    shallow(<TrailInfoView {...props} />)
  })
})
