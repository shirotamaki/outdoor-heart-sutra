import cropImage from '@/features/photo/cropImage'

describe('cropImage', () => {
  it('returns blob when crop is successful', async () => {
    const drawImageMock = jest.fn()

    const toBlobMock = jest.fn().mockImplementation((callback) => {
      setTimeout(() => callback(new Blob()), 0)
    })

    const getContextMock = jest.fn().mockReturnValue({
      drawImage: drawImageMock,
    })

    // Mocking HTMLCanvasElement, getContext, and toBlob
    window.HTMLCanvasElement.prototype.getContext = getContextMock
    window.HTMLCanvasElement.prototype.toBlob = toBlobMock

    // Mocking Image and its onload and onerror properties
    Object.defineProperty(global, 'Image', {
      value: class {
        onload: () => void = () => {}
        onerror: () => void = () => {}
        src: string = ''

        constructor() {
          setTimeout(() => this.onload(), 0)
        }
      },
    })

    const pixelCrop = {
      width: 100,
      height: 100,
      x: 50,
      y: 50,
    }

    const result = await cropImage('dummy-image-src', pixelCrop)

    expect(result).toBeInstanceOf(Blob)
    expect(drawImageMock).toHaveBeenCalled()
    expect(toBlobMock).toHaveBeenCalled()
  }, 10000)
})
