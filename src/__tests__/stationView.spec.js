import React from 'react'
import { shallow } from 'enzyme'
import StationView from '../components/stationView.js'

/* eslint-env jest */

describe('<StationView>', () => {
  it('should render without crashing', () => {
    shallow(<StationView activities={[{ uuid: 'uuid' }]} />)
  })

  it('should render Activities', () => {
    const activities = [
      {
        uuid: 'uuid1'
      },
      {
        uuid: 'uuid2'
      }
    ]
    const wrapper = shallow(<StationView name='name' description='' activities={activities} />)
    expect(wrapper.find('.station__activities').children()).toHaveLength(activities.length)
  })
})
