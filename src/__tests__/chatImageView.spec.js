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
        'test.jpg',
        'test2.jpg',
      ]
    }
    const wrapper = shallow(<ChatImageView {...props} />)

    expect(wrapper.find('img')).toHaveLength(props.images.length)
  })

})
