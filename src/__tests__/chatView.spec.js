import React from 'react'
import { shallow } from 'enzyme'
import ChatView from '../components/Chat.view.js'
import {
  SENDER_IS_PLAYER
} from '../constants/chat.constants.js'


const test_props = {
  messages: [
    {
      sender: 'Test',
      message: 'Hallo Welt Error1'
    },
    {
      sender: SENDER_IS_PLAYER,
      message: 'Hallo Welt Log2'
    }
  ]
}

/* eslint-env jest */

describe('<ChatView>', () => {
  it('should render without crashing', () => {
    const props = {
      messages: [
      ]
    }
    shallow(<ChatView {...props} />)
  })

  it('should render messages', () => {
    const wrapper = shallow(<ChatView {...test_props} />)

    expect(wrapper.find('.message_board').children()).toHaveLength(2)
  })
})
