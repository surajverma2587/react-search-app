import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetchData = (searchURL) => {
  const [results, setResults] = useState([]) 
  
  useEffect(() => {
    if (searchURL) {
      const fetchData = async () => {
        const { data } = await axios.get(searchURL)
        const transformedData = data.results.docs.map(({ name }) => name)
        setResults(transformedData)
      }
      fetchData()
    } else setResults([])
  }, [searchURL])

  return results
}

export default useFetchData