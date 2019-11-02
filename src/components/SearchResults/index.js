import React from 'react'

const SearchResults = ({ results }) => (
  <div className="c-search-results">
    {
      results.map(result => (
        <div className="c-search-results__item" key={result}>
         {result}
        </div>
      ))
    }
  </div>
)

export default SearchResults