import React from 'react'
import { shallow } from 'enzyme'

import SearchResults from '../../../components/SearchResults'

const render = (results) => shallow(<SearchResults results={results} />)

describe('Search Results', () => {
  test('should render the SearchResults component', () => {
    expect(render(['foo', 'bar']).find('.c-search-results').exists()).toEqual(true)
  })

  test('should render the SearchResults component with the expected search result items', () => {
    const results = ['foo', 'bar', 'biz', 'baz']
    const items = render(results).find('.c-search-results__item')
    expect(items.length).toEqual(4)
    expect(items.map(item => item.text())).toEqual(results)
  })
})