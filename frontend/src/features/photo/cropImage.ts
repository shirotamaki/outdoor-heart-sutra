export default function cropImage(
  imageSrc: string,
  pixelCrop: { width: number; height: number; x: number; y: number },
): Promise<Blob> {
  const canvas = document.createElement('canvas')
  const image = new Image()

  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('Canvas Context is null')
  }

  return new Promise((resolve, reject) => {
    image.onload = function () {
      context.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height,
      )

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error('Canvas to Blob failed'))
          }
        },
        'image/jpeg',
        0.1,
      )
    }
    image.onerror = reject
    image.src = imageSrc
  })
}
