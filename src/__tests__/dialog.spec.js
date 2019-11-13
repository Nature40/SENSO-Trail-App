import React from 'react'
import { shallow } from 'enzyme'
import Dialog from '../components/dialog.js'

/* eslint-env jest */

describe('<Dialog>', () => {
  it('should render', () => {
    const wrapper = shallow(<Dialog title='test' open={false} />)

    expect(wrapper.find('.dialog')).toHaveLength(1)
  })

  it('should render open', () => {
    const wrapper = shallow(<Dialog title='test' open />)

    expect(wrapper.find('.box')).toHaveLength(1)
  })

  it('should render closed', () => {
    const wrapper = shallow(<Dialog title='test' open={false} />)

    expect(wrapper.find('.box')).toHaveLength(0)
  })

  it('should render children', () => {
    const wrapper = shallow(
      <Dialog title='test' open>
        <span className='testClass' />
      </Dialog>
    )

    expect(wrapper.find('.testClass')).toHaveLength(1)
  })

  it('should render tools', () => {
    const tools = [
      (<button key='b' className='testButton' />)
    ]
    const wrapper = shallow(
      <Dialog title='test' open tools={tools} />
    )

    expect(wrapper.find('.testButton')).toHaveLength(1)
  })
})
