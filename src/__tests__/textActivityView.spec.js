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
      },
      onReadText: jest.fn(),
    }
    const wrapper = shallow(<TextActivity {...props} />)

    expect(wrapper
      .find('.info_card__content')
      .containsMatchingElement(<ReactMarkdown source={props.activity.text} />)
    ).toEqual(true)
  })

  it('should not call onReadText if completed is true', () => {
    const props = {
      activity: {
        uuid: 'uuid1',
        text: 'test text',
        name: 'test activity',
        completed: true
      },
      onReadText: jest.fn(),
    }
    const wrapper = shallow(<TextActivity {...props} />)

    expect(props.onReadText.mock.calls.length).toEqual(0)
  })

  it('should call onReadText if completed is false ', () => {
    const props = {
      activity: {
        uuid: 'uuid1',
        text: 'test text',
        name: 'test activity',
        completed: false
      },
      onReadText: jest.fn(),
    }
    const wrapper = shallow(<TextActivity {...props} />)

    expect(props.onReadText.mock.calls.length).toEqual(1)
  })

  it('should call onReadText if completed is undefined', () => {
    const props = {
      activity: {
        uuid: 'uuid1',
        text: 'test text',
        name: 'test activity',
      },
      onReadText: jest.fn(),
    }
    const wrapper = shallow(<TextActivity {...props} />)

    expect(props.onReadText.mock.calls.length).toEqual(1)
  })
})
