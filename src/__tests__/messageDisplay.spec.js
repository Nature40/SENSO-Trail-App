import React from 'react'
import { shallow } from 'enzyme'
import MessageDisplay from '../components/messageDisplay.js'
import {
  MESSAGE_TYPE_ERROR,
  MESSAGE_TYPE_LOG
} from '../constants/messages.constatns.js'


/* eslint-env jest */

describe('<MessageDisplay>', () => {
  it('should render without crashing', () => {
    const props = {
      messages: [
      ]
    }
    shallow(<MessageDisplay {...props} />)
  })

  it('should render messages', () => {
    const props = {
      messages: [
        {
          messageType: MESSAGE_TYPE_ERROR,
          test: 'Hallo Welt Error1'
        },
        {
          messageType: MESSAGE_TYPE_LOG,
          test: 'Hallo Welt Log2'
        }
      ]
    }
    const wrapper = shallow(<MessageDisplay {...props} />)

    expect(wrapper.find('.message_display').children()).toHaveLength(2)
  })
  
  it('should label messages with correct css classes', () => {
    const props = {
      messages: [
        {
          messageType: MESSAGE_TYPE_ERROR,
          test: 'Hallo Welt Error1'
        },
        {
          messageType: MESSAGE_TYPE_LOG,
          test: 'Hallo Welt Log2'
        }
      ]
    }
    const wrapper = shallow(<MessageDisplay {...props} />)

    expect(wrapper.find('.message_display').childAt(0).hasClass('message--error')).toEqual(true)
    expect(wrapper.find('.message_display').childAt(1).hasClass('message--log')).toEqual(true)
  })

})
