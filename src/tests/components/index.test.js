import React from 'react'
import { shallow } from 'enzyme'
import SearchWidget from '../../components/SearchWidget'

const render = (props = {}) => shallow(<SearchWidget {...props} />)

test('should render the snapshot of the SearchWidget component', () => {
  expect(render()).toMatchSnapshot();
})

test('should render the SearchWidget container', () => {
  expect(render().find('.c-searchwidget').exists()).toEqual(true)
})

test('should render the SearchWidget title', () => {
  expect(render().find('.c-searchwidget__title').exists()).toEqual(true)
})

test('should render the SearchWidget title with default title', () => {
  expect(render().find('.c-searchwidget__title').text()).toEqual('Where are you going?')
})

test('should render the searchbox container', () => {
  expect(render().find('.c-searchwidget__searchbox').exists()).toEqual(true)
})

test('should render the form field label', () => {
  expect(render().find('.c-form-field__label').exists()).toEqual(true)
})

test('should render the form field label with default label', () => {
  expect(render().find('.c-form-field__label').text()).toEqual('Pick-up Location')
})

test('should render the form-field input container', () => {
  expect(render().find('.c-form-field__input').exists()).toEqual(true)
})

test('should render an input element', () => {
  expect(render().find('input').exists()).toEqual(true)
})

test('should render an input element with default placeholder', () => {
  expect(render().find('input').prop('placeholder')).toEqual('city, airport, station, region, district...')
})

test('should render an input element with type \'text\'', () => {
  expect(render().find('input').prop('type')).toEqual('text')
})

test('should render the search results container', () => {
  expect(render().find('.c-search-results').exists()).toEqual(true)
})

test('should render the search results item with expected count of 3', () => {
  expect(render().find('.c-search-results__item').length).toEqual(3)
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