import Image from 'next/image'
import React, { useState } from 'react'

const PhotoUploadAndPreview = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const file = event.target.files[0]

      try {
        const heic2any = (await import('heic2any')).default
        if (file.type === 'image/heic') {
          const convertedImage = await heic2any({
            blob: file,
            toType: 'image/jpeg',
            quality: 0.5,
          })
          if (Array.isArray(convertedImage)) {
            throw new Error('Unexpected multiple blobs')
          }
          setPreviewUrl(URL.createObjectURL(convertedImage))
        } else {
          setPreviewUrl(URL.createObjectURL(file))
        }
      } catch (error) {
        console.error('Error converting image: ', error)
      }
    } else {
      return
    }
  }

  return (
    <div>
      <input
        type='file'
        accept='image/jpeg, image/png, image/heic'
        onChange={handleFileChange}
      />
      {previewUrl ? (
        <Image src={previewUrl} alt='preview' width={480} height={480} />
      ) : (
        'No preview'
      )}
    </div>
  )
}

export default PhotoUploadAndPreview
