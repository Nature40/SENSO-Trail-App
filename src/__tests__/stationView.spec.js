import React from 'react'
import { shallow } from 'enzyme'
import StationView from '../components/stationView.js'

/* eslint-env jest */

describe('<StationView>', () => {
  it('should render without crashing', () => {
    const props = {
      station: {}
    }
    shallow(<StationView {...props} />)
  })

  it('should render Activities', () => {
    const props = {
      station: {
        uuid: 'uuid-s1',
        name: 'name',
        desription: '',
        activities: [
          {
            uuid: 'uuid1'
          },
          {
            uuid: 'uuid2'
          }
        ]
      }
    }
    const wrapper = shallow(<StationView {...props} />)
    expect(wrapper.find('.station__activities').children())
      .toHaveLength(props.station.activities.length)
  })
})
