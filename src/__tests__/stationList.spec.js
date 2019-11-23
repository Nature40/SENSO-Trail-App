import React from 'react'
import { shallow } from 'enzyme'
import StationList from '../components/stationList.js'

/* eslint-env jest */

describe('<StationList>', () => {
  it('should render without crashing', () => {
    shallow(<StationList stations={[]} />)
  })

  it('should render "Keine Stationen geladen" if no stations had been loaded', () => {
    const wrapper = shallow(<StationList stations={[]} />)

    expect(wrapper.find('p').text()).toEqual('Keine Stationen geladen')
  })

  it('should render "Station Views" if stations had been loaded', () => {
    const stations = [
      'uuid1',
      'uuid2'
    ]
    const wrapper = shallow(<StationList stations={stations} />)

    expect(wrapper.find('.station_list__item')).toHaveLength(2)
  })
})
