import { useState } from 'react'

import useFetchData from './useFetchData'
import useDebounce from './useDebounce'

const useResults = (initialState = {}) => { 
  const {
    initialShowResult = false,
    initialSearchTerm = '',
  } = initialState
  const [showResults, setShowResults] = useState(initialShowResult)
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)

  const onBlur = () => setShowResults(false)

  const onFocus = () => setShowResults(true)

  const onChange = ({ target: { value } }) => setSearchTerm(value)

  const searchURL = useDebounce(searchTerm)
  
  const data = useFetchData(searchURL)

  const props = {
    onBlur,
    onFocus,
    onChange,
  }
  
  return [props, showResults, data]
}

export default useResults