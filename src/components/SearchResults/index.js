import React from 'react'
import PropTypes from 'prop-types'

const SearchResults = ({ showResults, results }) => showResults && results.length ? (
  <div className="c-search-results">
    {
      results.map(result => (
        <div className="c-search-results__item" key={result}>
         {result}
        </div>
      ))
    }
  </div>
) : null

SearchResults.defaultProps = {
  results: [],
  showResults: false,
}

SearchResults.propTypes = {
  results: PropTypes.array.isRequired,
  showResults: PropTypes.bool.isRequired,
}

export default SearchResults