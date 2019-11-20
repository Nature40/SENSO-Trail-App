import React from 'react'
import { shallow, mount } from 'enzyme'
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

  it('should handle click if new answer is clicked', () => {
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
      },
      onChooseAnswer: jest.fn()
    }
    const wrapper = mount(<MultiChoiceActivity {...props} />)
    const buttons = wrapper.find('button')
    expect(buttons).toHaveLength(2)
    buttons.first().simulate('click')
    expect(props.onChooseAnswer.mock.calls.length).toEqual(1)
  })

  it('should not call onChooseAnswer if answer is already clicked', () => {
    const props = {
      activity: {
        uuid: 'uuid1',
        name: 'test activity',
        question: 'question?',
        answers: {
          1: {
            text: 'test answer1',
            id: '1',
            choosen: true,
            correct: false
          },
          2: {
            text: 'test answer2',
            id: '2',
            correct: true
          }
        }
      },
      onChooseAnswer: jest.fn()
    }
    const wrapper = mount(<MultiChoiceActivity {...props} />)
    const button = wrapper.find('.multi_choice_answer--choosen')
    expect(button).toHaveLength(1)
    button.simulate('click')
    expect(props.onChooseAnswer.mock.calls.length).toEqual(0)
  })

  it('should not call onChooseAnswer if answers are revealed', () => {
    const props = {
      activity: {
        uuid: 'uuid1',
        name: 'test activity',
        question: 'question?',
        reveal: true,
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
      },
      onChooseAnswer: jest.fn()
    }
    const wrapper = mount(<MultiChoiceActivity {...props} />)
    const buttons = wrapper.find('button')
    expect(buttons).toHaveLength(2)
    buttons.first().simulate('click')
    expect(props.onChooseAnswer.mock.calls.length).toEqual(0)
  })
})
