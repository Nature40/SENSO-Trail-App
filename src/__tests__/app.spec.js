import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import App from '../components/app.js'
import NoMatch from '../components/noMatch.js'

import configureStore, { history } from '../createStore.js'
import { Provider } from 'react-redux'


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
      const { store, persistor } = configureStore()
  return mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    </Provider>
  )
}
