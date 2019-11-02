import React from 'react'

const SearchWidget = () => {
  return (
    <div className="c-searchwidget">
      <h2 className="c-searchwidget__title">Where are you going?</h2>
      <div className="c-searchwidget__searchbox">
        <label className="c-form-field__label">
          Pick-up Location
        </label>
        <div className="c-form-field__input">
          <input type="text" placeholder="city, airport, station, region, district..." />
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

export default SearchWidget