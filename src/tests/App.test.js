import React from 'react'
import { shallow } from 'enzyme'
import App from '../App'

test('should render the App component', () => {
  expect(shallow(<App />).text()).toEqual('Your app goes here...')
})
