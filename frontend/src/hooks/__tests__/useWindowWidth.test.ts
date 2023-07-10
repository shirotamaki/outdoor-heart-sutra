import { renderHook, act } from '@testing-library/react'
import useWindowWidth from '@/hooks/useWindowWidth'

describe('useWindowWidth', () => {
  const mockResizeWindowWidth = (x: number) => {
    global.innerWidth = x
    global.dispatchEvent(new Event('resize'))
  }

  it('should return window width correctly', () => {
    mockResizeWindowWidth(640)

    const { result } = renderHook(() => useWindowWidth())
    expect(result.current).toBe(640)

    act(() => {
      mockResizeWindowWidth(768)
    })

    expect(result.current).toBe(768)
  })
})
