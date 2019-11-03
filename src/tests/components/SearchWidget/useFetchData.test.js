import axios from 'axios'
import { renderHook, act } from '@testing-library/react-hooks'

import useFetchData from '../../../components/SearchWidget/useFetchData'

afterEach(() => {    
  jest.clearAllMocks();
});

const mockData = {
  data: {
    results: { docs: [{ name: 'Foo' }, { name: 'Bar' }] }
  }
}

const mockAxios = (data = mockData) => axios.get.mockResolvedValue(data)

test('should set results to an empty array when url is undefined', async () => {
  const { result } = renderHook(() => useFetchData())

  expect(result.current).toEqual([]);
})

test('should not make an API get request when url is undefined', async () => {
  const spy = jest.spyOn(axios, 'get')
  renderHook(() => useFetchData())

  expect(spy).not.toBeCalled()
})

test('should set results when url is available', async () => {
  jest.spyOn(axios, 'get')
  mockAxios()
  const { result } = renderHook(() => useFetchData('someURL'))

  await act(async () => result.current)

  expect(result.current).toEqual(['Foo', 'Bar'])
})

test('should make an API get request when url is available', async () => {
  const spy = jest.spyOn(axios, 'get')
  mockAxios()
  await act(async () => renderHook(() => useFetchData('someURL')))

  expect(spy).toBeCalledWith('someURL')
})

test('should update results with new results when url changes', async () => {
  const results1 = [{ name: 'Foo' }, { name: 'Bar' }]
  const results2 = [{ name: 'Biz' }, { name: 'Baz' }]

  jest.spyOn(axios, 'get')
  mockAxios({
    data: { results: { docs: results1 } }
  })

  let url = 'url1'
  const { result, rerender } = renderHook(() => useFetchData(url))
  
  await act(async () => result.current)
  
  expect(result.current).toEqual(['Foo', 'Bar'])
  
  url = 'url2'

  mockAxios({
    data: { results: { docs: results2 } }
  })

  await act(async () => rerender())
 
  expect(result.current).toEqual(['Biz', 'Baz'])
})
