import Image from 'next/image'
import { CapturedImageProps } from '@/types/types'

const CapturedImage = ({ capturedImageUrl, width, height, borderRadius }: CapturedImageProps) => {
  return (
    <>
      <Image
        src={capturedImageUrl as string}
        alt='capturedImage'
        width={width}
        height={height}
        style={{ borderRadius: borderRadius }}
      />
    </>
  )
}

export default CapturedImage
