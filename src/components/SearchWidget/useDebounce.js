import { useState, useEffect } from 'react'

const useDebounce = (searchTerm) => {
  const [value, setValue] = useState(searchTerm)

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(searchTerm)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [searchTerm])
  
  return (value && value.length > 1) ? `https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=10&solrTerm=${value}` : ''
}

export default useDebounce