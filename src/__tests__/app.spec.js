import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import App from '../components/app.js'
import NoMatch from '../components/noMatch.js'

/* eslint-env jest */

describe('<App>', () => {
  describe('Routing', () => {
    it('invalid path should redirect to NoMatch', () => {
      const wrapper = mountWithRoute('/this-page-does-not-exist')

      expect(wrapper.find(NoMatch)).toHaveLength(1)
    })
  })
})

function mountWithRoute (route) {
  return mount(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  )
}
