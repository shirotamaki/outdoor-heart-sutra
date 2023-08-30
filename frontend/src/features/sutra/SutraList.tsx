import { useState, useEffect } from 'react'
import SutraMdLayout from '@/features/sutra/SutraMdLayout'
import SutraOverXlLayout from '@/features/sutra/SutraOverXlLayout'
import SutraSmLayout from '@/features/sutra/SutraSmLayout'
import SutraXlLayout from '@/features/sutra/SutraXlLayout'
import useWindowWidth from '@/hooks/useWindowWidth'
import { SutraListProps } from '@/types/types'

const SutraList = ({ sutras, photos }: SutraListProps) => {
  const windowWidth = useWindowWidth()
  const [isSmView, setIsSmView] = useState(false)
  const [isMdView, setIsMdView] = useState(false)
  const [isXlView, setIsXlView] = useState(false)

  useEffect(() => {
    if (windowWidth !== null) {
      if (windowWidth <= 640) {
        setIsSmView(true)
        setIsMdView(false)
        setIsXlView(false)
      } else if (windowWidth > 640 && windowWidth <= 768) {
        setIsSmView(false)
        setIsMdView(true)
        setIsXlView(false)
      } else if (windowWidth > 768 && windowWidth <= 1280) {
        setIsSmView(false)
        setIsMdView(false)
        setIsXlView(true)
      } else if (windowWidth > 1280) {
        setIsSmView(false)
        setIsMdView(false)
        setIsXlView(false)
      }
    }
  }, [windowWidth])

  if (isSmView) {
    return (
      <div className='mx-4 my-4'>
        <SutraSmLayout sutras={sutras} photos={photos} />
      </div>
    )
  } else if (isMdView) {
    return (
      <div className='mx-12 my-6'>
        <SutraMdLayout sutras={sutras} photos={photos} />
      </div>
    )
  } else if (isXlView) {
    return (
      <div className='mx-12 my-8'>
        <SutraXlLayout sutras={sutras} photos={photos} />
      </div>
    )
  } else {
    return (
      <div className='mx-12 my-10'>
        <SutraOverXlLayout sutras={sutras} photos={photos} />
      </div>
    )
  }
}

export default SutraList
