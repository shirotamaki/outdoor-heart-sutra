import Image from 'next/image'

type Props = {
  url: string
  width: number
  height: number
  borderRadius: string
}

const CapturedImage = ({ url, width, height, borderRadius }: Props) => {
  return (
    <>
      <Image src={url} alt='Screenshot' width={width} height={height} style={{ borderRadius }} />
    </>
  )
}

export default CapturedImage
