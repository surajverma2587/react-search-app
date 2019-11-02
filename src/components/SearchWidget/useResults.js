import { useState } from 'react'

const useResults = (initialState = {}) => {
  const mockResults = [
    'Manchester Airport',
    'Manchester',
    'Manchester - Piccadilly Train Station'
  ];
  
  const {
    initialShowResult = false,
    initialResults = [],
  } = initialState
  const [showResults, setShowResults] = useState(initialShowResult)
  const [results, setResults] = useState(initialResults)

  const onBlur = () => setShowResults(false)

  const onFocus = () => setShowResults(true)

  const onChange = ({ target: { value } }) => value.length > 1 ? setResults(mockResults) : setResults([])
  
  const props = {
    onBlur,
    onFocus,
    onChange,
  }
  return [props, showResults, results]
}

export default useResults