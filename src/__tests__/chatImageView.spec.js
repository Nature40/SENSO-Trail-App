import React from 'react'
import { shallow } from 'enzyme'
import ChatImageView from '../components/ChatImage.view.js'

/* eslint-env jest */

describe('<ChatImageView>', () => {
  it('should render without crashing', () => {
    const props = {
      images: []
    }
    shallow(<ChatImageView {...props} />)
  })

  it('should render images', () => {
    const props = {
      images: [
        {src: 'test.jpg', alt: 'test'},
        {src: 'test2.jpg', alt: 'blub'},
      ]
    }
    const wrapper = shallow(<ChatImageView {...props} />)

    expect(wrapper.find('img')).toHaveLength(2)
    expect(wrapper.find('img').at(0).props()).toHaveProperty('alt')
    expect(wrapper.find('img').at(0).props().alt).toEqual('test')
    //expect(wrapper.find('img')[0]).toHaveProperty('alt')
  })

})
