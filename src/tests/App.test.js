import React from 'react'
import { shallow } from 'enzyme'

import App from '../App'

test('should render the App component', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find('SearchWidget').exists()).toEqual(true)
})
