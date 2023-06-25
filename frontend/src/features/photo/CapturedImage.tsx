import Image from 'next/image'

type Props = {
  capturedImageUrl: string | null
  width: number
  height: number
  borderRadius: string
}

const CapturedImage = ({ capturedImageUrl, width, height, borderRadius }: Props) => {
  return (
    <>
      <Image
        src={capturedImageUrl as string}
        alt='Image'
        width={width}
        height={height}
        style={{ borderRadius: borderRadius }}
      />
    </>
  )
}

export default CapturedImage
