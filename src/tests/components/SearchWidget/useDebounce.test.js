import { renderHook, act } from '@testing-library/react-hooks'

import useDebounce from '../../../components/SearchWidget/useDebounce'

beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {    
  jest.clearAllMocks()
})

test('should return \'\' when value is undefined', async () => {
  const { result } = renderHook(() => useDebounce())

  expect(result.current).toEqual('')
})

test('should return \'\' when value length is 0', () => {
  const { result } = renderHook(() => useDebounce(''))

  expect(result.current).toEqual('')
})

test('should return \'\' when value length is 1', () => {
  const { result } = renderHook(() => useDebounce(''))

  expect(result.current).toEqual('')
})

test('should return expected URL when value length is greater than 1', () => {
  const searchTerm = 'foo'
  const { result } = renderHook(() => useDebounce(searchTerm))

  expect(result.current).toEqual(`https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=10&solrTerm=${searchTerm}`)
})

test('should call the setTimeout function', async () => {
  await act(async () => renderHook(() => useDebounce('foo')))

  expect(setTimeout).toHaveBeenCalledTimes(1)
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500)
})

test('should return the URL with the updated search term after timeout', async () => {
  let searchTerm = 'foo'
  const { result, rerender } = renderHook(() => useDebounce(searchTerm))
  
  act(() => jest.advanceTimersByTime(500));

  expect(result.current).toEqual(`https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=10&solrTerm=${searchTerm}`)
  
  searchTerm = 'foobar'
  
  rerender()
  
  act(() => jest.advanceTimersByTime(500));

  expect(result.current).toEqual(`https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=10&solrTerm=${searchTerm}`)
})

test('should return the URL with the same search term before timeout', async () => {
  let searchTerm = 'foo'
  const { result, rerender } = renderHook(() => useDebounce(searchTerm))
  
  act(() => jest.advanceTimersByTime(300));

  expect(result.current).toEqual(`https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=10&solrTerm=foo`)
  
  searchTerm = 'foobar'
  
  rerender()
  
  act(() => jest.advanceTimersByTime(300));

  expect(result.current).toEqual(`https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=10&solrTerm=foo`)
})

