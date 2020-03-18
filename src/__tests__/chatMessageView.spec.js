import React from 'react'
import { shallow } from 'enzyme'
import ChatMessageView from '../components/ChatMessage.view.js'
import {
  SENDER_IS_PLAYER
} from '../constants/chat.constants.js'


const test_message_other = {
  sender: 'Test',
  message: 'Hallo Welt Error1'
}
const test_message_own ={
  sender: SENDER_IS_PLAYER,
  message: 'Hallo Welt Log2'
}

/* eslint-env jest */

describe('<ChatMessageView>', () => {
  it('should render without crashing', () => {
    const props = {
      message: '',
      sender: ''
    }
    shallow(<ChatMessageView {...props} />)
  })
  
  it('should label own messages with correct css classes', () => {
    const wrapper = shallow(<ChatMessageView {...test_message_own} />)

    expect(wrapper.find('.chat_message--own')).toHaveLength(1)
  })

  it('should label other messages with correct css classes', () => {
    const wrapper = shallow(<ChatMessageView {...test_message_other} />)

    expect(wrapper.find('.chat_message--others')).toHaveLength(1)
  })

})
