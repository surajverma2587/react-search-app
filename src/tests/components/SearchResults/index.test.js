import React from 'react'
import { shallow } from 'enzyme'

import SearchResults from '../../../components/SearchResults'

const render = (props) => shallow(<SearchResults {...props} />)

describe('Search Results', () => {
  test('should render the SearchResults component when results are not empty and showResults is TRUE', () => {
    const props = { results: ['foo', 'bar'], showResults: true }
    expect(render(props).find('.c-search-results').exists()).toEqual(true)
  })

  test('should not render the SearchResults component with default props', () => {
    expect(render().find('.c-search-results').exists()).toEqual(false)
  })

  test('should render the SearchResults component with the expected search result items', () => {
    const props = {
      results: ['foo', 'bar', 'biz', 'baz'],
      showResults: true,
    }
    const items = render(props).find('.c-search-results__item')
    expect(items.length).toEqual(props.results.length)
    expect(items.map(item => item.text())).toEqual(props.results)
  })
})