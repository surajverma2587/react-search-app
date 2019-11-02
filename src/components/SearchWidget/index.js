import React, { useState } from 'react'
import PropTypes from 'prop-types'

import SearchResults from '../SearchResults'

const mockResults = [
  'Manchester Airport',
  'Manchester',
  'Manchester - Piccadilly Train Station'
];

const SearchWidget = ({ label, title, placeholder }) => {
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState([])

  const onBlur = () => setShowResults(false)

  const onFocus = () => setShowResults(true)

  const onChange = ({ target: { value }}) => value.length > 1 ? setResults(mockResults) : setResults([])

  return (
    <div className="c-searchwidget">
      <h2 className="c-searchwidget__title">{title}</h2>
      <div className="c-searchwidget__searchbox">
        <label className="c-form-field__label">{label}</label>
        <div className="c-form-field__input">
          <input
            type="text"
            placeholder={placeholder}
            onBlur={onBlur}
            onFocus={onFocus}
            onChange={onChange}
          />
          {
            showResults && results.length ? <SearchResults results={results} /> : null
          }
        </div>
      </div>
    </div>
  )
}

SearchWidget.defaultProps = {
  label: 'Pick-up Location',
  placeholder: 'city, airport, station, region, district...',
  title: 'Where are you going?',
}

SearchWidget.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default SearchWidget