import { useState, useEffect } from 'react'
import SutraLgTo2XlLayout from '@/features/sutra/SutraLgTo2XlLayout'
import SutraOver2XlLayout from '@/features/sutra/SutraOver2XlLayout'
import SutraSmOrBelowLayout from '@/features/sutra/SutraSmOrBelowLayout'
import SutraSmToLgLayout from '@/features/sutra/SutraSmToLgLayout'
import useWindowWidth from '@/hooks/useWindowWidth'
import { SutraListProps } from '@/types/types'

const SutraList = ({ sutras, photos }: SutraListProps) => {
  const windowWidth = useWindowWidth()
  const [isSmOrBelowView, setIsSmOrBelowView] = useState(false)
  const [isSmToLgView, setIsSmToLgView] = useState(false)
  const [isLgTo2XlView, setIsLgTo2XlView] = useState(false)

  useEffect(() => {
    if (windowWidth !== null) {
      if (windowWidth <= 640) {
        setIsSmOrBelowView(true)
        setIsSmToLgView(false)
        setIsLgTo2XlView(false)
      } else if (windowWidth > 640 && windowWidth <= 1024) {
        setIsSmOrBelowView(false)
        setIsSmToLgView(true)
        setIsLgTo2XlView(false)
      } else if (windowWidth > 1024 && windowWidth <= 1536) {
        setIsSmOrBelowView(false)
        setIsSmToLgView(false)
        setIsLgTo2XlView(true)
      } else if (windowWidth > 1536) {
        setIsSmOrBelowView(false)
        setIsSmToLgView(false)
        setIsLgTo2XlView(false)
      }
    }
  }, [windowWidth])

  if (isSmOrBelowView) {
    return (
      <div className='mx-4 my-4'>
        <SutraSmOrBelowLayout sutras={sutras} photos={photos} />
      </div>
    )
  } else if (isSmToLgView) {
    return (
      <div className='mx-4 my-4'>
        <SutraSmToLgLayout sutras={sutras} photos={photos} />
      </div>
    )
  } else if (isLgTo2XlView) {
    return (
      <div className='mx-4 my-4'>
        <SutraLgTo2XlLayout sutras={sutras} photos={photos} />
      </div>
    )
  } else {
    return (
      <div className='mx-4 my-4'>
        <SutraOver2XlLayout sutras={sutras} photos={photos} />
      </div>
    )
  }
}

export default SutraList
