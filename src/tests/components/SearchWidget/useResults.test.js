import { renderHook, act } from '@testing-library/react-hooks'

import useResults from '../../../components/SearchWidget/useResults'
import useDebounce from '../../../components/SearchWidget/useDebounce'
import useFetchData from '../../../components/SearchWidget/useFetchData'

jest.mock('../../../components/SearchWidget/useDebounce')
jest.mock('../../../components/SearchWidget/useFetchData')

afterEach(() => {    
  jest.clearAllMocks()
})

test('should set showResults to TRUE on onFocus', () => {
  const { result } = renderHook(() => useResults())

  act(() => result.current[0].onFocus())

  expect(result.current[1]).toEqual(true);
})

test('should set showResults to FALSE on onBlur', () => {
  const { result } = renderHook(() => useResults({ initialShowResult: true }))

  act(() => result.current[0].onBlur())

  expect(result.current[1]).toEqual(false);
})

test('should set searchTerm to new search term on onChange', async () => {
  const { result, rerender } = renderHook(() => useResults({ initialSearchTerm: 'foo' }))
  
  expect(useDebounce).toBeCalledWith('foo')

  jest.clearAllMocks()

  act(() => result.current[0].onChange({ target: { value: 'foo bar' } }))

  rerender()

  expect(useDebounce).toBeCalledWith('foo bar')
})

test('should return search results as data for some URL fetch', () => {
  const mockData = ['foo', 'bar']

  useDebounce.mockReturnValue('someURL')
  useFetchData.mockReturnValue(mockData)

  const { result } = renderHook(() => useResults({ initialSearchTerm: 'foo' }))

  expect(useFetchData).toBeCalledWith('someURL')
  expect(result.current[2]).toEqual(mockData);
})

