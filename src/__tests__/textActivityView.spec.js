import React from 'react'
import { shallow } from 'enzyme'
import TextActivity from '../components/textActivity.js'

import ReactMarkdown from 'react-markdown'

/* eslint-env jest */

describe('<TextActivity>', () => {
  it('should render without crashing', () => {
    const props = {
      activity: {
        uuid: 'uuid1',
        text: 'test text',
        name: 'test activity',
        open: true
      },
      onReadText: jest.fn(),
      onCloseText: jest.fn()
    }
    shallow(<TextActivity {...props} />)
  })

  it('should render text if open is true', () => {
    const props = {
      activity: {
        uuid: 'uuid1',
        text: 'test text',
        name: 'test activity',
        open: true
      },
      onReadText: jest.fn(),
      onCloseText: jest.fn()
    }
    const wrapper = shallow(<TextActivity {...props} />)
    expect(wrapper
      .find('.text_activity__content')
      .containsMatchingElement(<ReactMarkdown source={props.activity.text} />)
    ).toEqual(true)
  })

  it('should not render text if open is false', () => {
    const props = {
      activity: {
        uuid: 'uuid1',
        text: 'test text',
        name: 'test activity',
        open: false
      },
      onReadText: jest.fn(),
      onCloseText: jest.fn()
    }
    const wrapper = shallow(<TextActivity {...props} />)
    expect(wrapper
      .find('.text_activity__content')
      .text()
    ).toEqual('')
  })

  it('should call onReadText if open Text button is clicked', () => {
    const props = {
      activity: {
        uuid: 'uuid1',
        text: 'test text',
        name: 'test activity',
        open: false
      },
      onReadText: jest.fn(),
      onCloseText: jest.fn()
    }
    const wrapper = shallow(<TextActivity {...props} />)
    const button = wrapper.find('#open_text--uuid1')

    expect(button).toHaveLength(1)

    button.simulate('click')

    expect(props.onReadText.mock.calls.length).toEqual(1)
  })

  it('should call onCloseText if close Text button is clicked', () => {
    const props = {
      activity: {
        uuid: 'uuid1',
        text: 'test text',
        name: 'test activity',
        open: true
      },
      onReadText: jest.fn(),
      onCloseText: jest.fn()
    }
    const wrapper = shallow(<TextActivity {...props} />)
    const button = wrapper.find('#close_text--uuid1')

    expect(button).toHaveLength(1)

    button.simulate('click')

    expect(props.onCloseText.mock.calls.length).toEqual(1)
  })
})
