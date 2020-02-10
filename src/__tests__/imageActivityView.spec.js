import React from 'react'
import { shallow } from 'enzyme'
import ImageActivity from '../components/imageActivity.js'

import ReactMarkdown from 'react-markdown'

/* eslint-env jest */

describe('<ImageActivity>', () => {
  it('should render without crashing', () => {
    const props = {
      activity: {
        uuid: 'uuid1',
        text: 'test text',
        name: 'test activity',
        image: {
          src: 'image.jpg',
          alt: 'image alt'
        }
      },
      onViewImage: jest.fn(),
    }
    const wrapper = shallow(<ImageActivity {...props} />)

    expect(wrapper
      .find('.image_activity__image img').debug()
    ).toEqual('<img src="image.jpg" alt="image alt" />')

    expect(wrapper
      .find('.image_activity__image img')
      .contains(<img src="image.jpg" alt="image alt" />)
    ).toEqual(true)

    expect(wrapper
      .find('.info_card__content')
      .containsMatchingElement(<ReactMarkdown source={props.activity.text} />)
    ).toEqual(true)
  })

  it('should not call onViewImage if completed is true', () => {
    const props = {
      activity: {
        uuid: 'uuid1',
        text: 'test text',
        name: 'test activity',
        completed: true,
        image: {
          src: 'image.jpg',
          alt: 'image alt'
        }

      },
      onViewImage: jest.fn(),
    }
    const wrapper = shallow(<ImageActivity {...props} />)

    expect(props.onViewImage.mock.calls.length).toEqual(0)
  })

  it('should call onViewImage if completed is false ', () => {
    const props = {
      activity: {
        uuid: 'uuid1',
        text: 'test text',
        name: 'test activity',
        completed: false,
        image: {
          src: 'image.jpg',
          alt: 'image alt'
        }

      },
      onViewImage: jest.fn(),
    }
    const wrapper = shallow(<ImageActivity {...props} />)

    expect(props.onViewImage.mock.calls.length).toEqual(1)
  })

  it('should call onViewImage if completed is undefined', () => {
    const props = {
      activity: {
        uuid: 'uuid1',
        text: 'test text',
        name: 'test activity',
        image: {
          src: 'image.jpg',
          alt: 'image alt'
        }

      },
      onViewImage: jest.fn(),
    }
    const wrapper = shallow(<ImageActivity {...props} />)

    expect(props.onViewImage.mock.calls.length).toEqual(1)
  })
})
