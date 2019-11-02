import React from 'react'
import PropTypes from 'prop-types'

const SearchWidget = ({ label, title, placeholder }) => {
  return (
    <div className="c-searchwidget">
      <h2 className="c-searchwidget__title">{title}</h2>
      <div className="c-searchwidget__searchbox">
        <label className="c-form-field__label">{label}</label>
        <div className="c-form-field__input">
          <input type="text" placeholder={placeholder} />
          <div className="c-search-results">
            <div className="c-search-results__item">
              Manchester Airport
            </div>
            <div className="c-search-results__item">
              Manchester
            </div>
            <div className="c-search-results__item">
              Manchester - Piccadilly Train Station
            </div>
          </div>
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