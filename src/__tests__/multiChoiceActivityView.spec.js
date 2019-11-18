import React from 'react'
import { shallow } from 'enzyme'
import MultiChoiceActivity from '../components/multiChoiceActivity.js'

/* eslint-env jest */

describe('<MultiChoiceActivity>', () => {
  it('should render without crashing', () => {
    const props = {
      activity: {
        uuid: 'uuid1',
        name: 'test activity',
        question: 'question?',
        answers: {
          1: {
            text: 'test answer1',
            id: '1',
            correct: false
          },
          2: {
            text: 'test answer2',
            id: '2',
            correct: true
          }
        }
      }
    }
    shallow(<MultiChoiceActivity {...props} />)
  })
  it('should render answers', () => {
    const props = {
      activity: {
        uuid: 'uuid1',
        name: 'test activity',
        question: 'question?',
        answers: {
          1: {
            text: 'test answer1',
            id: '1',
            correct: false
          },
          2: {
            text: 'test answer2',
            id: '2',
            correct: true
          }
        }
      }
    }
    const wrapper = shallow(<MultiChoiceActivity {...props} />)
    expect(wrapper.find('MultiChoiceAnswer')).toHaveLength(2)
  })
})
