import React from 'react'
import { mount } from 'enzyme'

import SearchWidget from '../../../components/SearchWidget'
import useDebounce from '../../../components/SearchWidget/useDebounce'
import useFetchData from '../../../components/SearchWidget/useFetchData'

jest.mock('../../../components/SearchWidget/useDebounce')
jest.mock('../../../components/SearchWidget/useFetchData')

const render = (props = {}) => mount(<SearchWidget {...props} />)

afterEach(() => {    
  jest.clearAllMocks()
})

describe('Snapshot Tests', () => {
  test('should render the snapshot of the SearchWidget component', () => {
    expect(render()).toMatchSnapshot();
  })
})

describe('Render Tests', () => {
  test('should render the SearchWidget container', () => {
    expect(render().find('.c-searchwidget').exists()).toEqual(true)
  })
  
  test('should render the SearchWidget title', () => {
    expect(render().find('.c-searchwidget__title').exists()).toEqual(true)
  })
  
  test('should render the searchbox container', () => {
    expect(render().find('.c-searchwidget__searchbox').exists()).toEqual(true)
  })
  
  test('should render the form field label', () => {
    expect(render().find('.c-form-field__label').exists()).toEqual(true)
  })
  
  test('should render the form-field input container', () => {
    expect(render().find('.c-form-field__input').exists()).toEqual(true)
  })
  
  test('should render an input element', () => {
    expect(render().find('input').exists()).toEqual(true)
  })
})

describe('SearchWidget Props Tests', () => {
  test('should render the SearchWidget title with default title', () => {
    expect(render().find('.c-searchwidget__title').text()).toEqual('Where are you going?')
  })

  test('should render the form field label with default label', () => {
    expect(render().find('.c-form-field__label').text()).toEqual('Pick-up Location')
  })

  test('should render an input element with default placeholder', () => {
    expect(render().find('input').prop('placeholder')).toEqual('city, airport, station, region, district...')
  })
  
  test('should render an input element with type \'text\'', () => {
    expect(render().find('input').prop('type')).toEqual('text')
  })

  test('should render the SearchWidget component with the expected title prop', () => {
    const title = 'Foo'
    expect(render({ title }).find('.c-searchwidget__title').text()).toEqual(title)
  })
  
  test('should render the SearchWidget component with the expected label prop', () => {
    const label = 'Foo'
    expect(render({ label }).find('.c-form-field__label').text()).toEqual(label)
  })
  
  test('should render the SearchWidget component with the expected placeholder prop', () => {
    const placeholder = 'Foo'
    expect(render({ placeholder }).find('input').prop('placeholder')).toEqual(placeholder)
  })
})

describe('SearchWidget Accessibility Test', () => {
  test('should make association between label and input element', () => {
    const wrapper = render()
    expect(wrapper.find('.c-form-field__label').prop('htmlFor')).toEqual('pick-up-location')
    expect(wrapper.find('input').prop('id')).toEqual('pick-up-location')
  })
  
})

describe('Search Results', () => {
  test('should not render on initial render', () => {
    expect(render().find('.c-search-results').exists()).toEqual(false)
  })

  test('should not render on onFocus event when results are empty', () => {
    const wrapper = render()
    const input = wrapper.find('input')
    input.simulate('focus')
  
    expect(wrapper.find('.c-search-results').exists()).toEqual(false)
  })

  test('should render on onFocus event when results are not empty', () => {
    const wrapper = render()
    const input = wrapper.find('input')

    useDebounce.mockReturnValue('someURL')
    useFetchData.mockReturnValue(['Foo', 'Bar'])

    input.simulate('change', { target: { value: 'Fo' } })
    input.simulate('focus')

    expect(wrapper.find('.c-search-results').exists()).toEqual(true)
  })

  test('should render on onChange event when length is greater than 1', () => {
    const wrapper = render()
    const input = wrapper.find('input')

    useDebounce.mockReturnValue('someURL')
    useFetchData.mockReturnValue(['Foo', 'Bar'])

    input.simulate('focus')
    input.simulate('change', { target: { value: 'Foo' } })
  
    expect(wrapper.find('.c-search-results').exists()).toEqual(true)
  })

  test('should not render on onChange event when length is equal to 1', () => {
    const wrapper = render()
    const input = wrapper.find('input')

    useDebounce.mockReturnValue('someURL')
    useFetchData.mockReturnValue([])

    input.simulate('focus')
    input.simulate('change', { target: { value: 'F' } })
  
    expect(wrapper.find('.c-search-results').exists()).toEqual(false)
  })

  test('should not render on onBlur event when results are not empty', () => {
    const wrapper = render()
    const input = wrapper.find('input')

    useDebounce.mockReturnValue('someURL')
    useFetchData.mockReturnValue(['Foo', 'Bar'])

    input.simulate('focus')
    input.simulate('change', { target: { value: 'Fo' } })
  
    expect(wrapper.find('.c-search-results').exists()).toEqual(true)

    input.simulate('blur')

    expect(wrapper.find('.c-search-results').exists()).toEqual(false)
  })
})