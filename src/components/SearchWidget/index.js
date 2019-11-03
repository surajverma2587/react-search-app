import React from 'react'
import PropTypes from 'prop-types'

import useResults from './useResults'
import SearchResults from '../SearchResults'

const SearchWidget = ({ label, title, placeholder }) => {
  const [inputProps, showResults, results] = useResults()

  return (
    <div className="c-searchwidget">
      <h2 className="c-searchwidget__title">{title}</h2>
      <div className="c-searchwidget__searchbox">
        <label className="c-form-field__label">{label}</label>
        <div className="c-form-field__input">
          <input
            type="text"
            placeholder={placeholder}
            {...inputProps}
          />
          <SearchResults showResults={showResults} results={results} />
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