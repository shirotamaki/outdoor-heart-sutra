import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { railsApiUrl } from '@/config/index'
import SutraLgTo2XlLayout from '@/features/sutra/SutraLgTo2XlLayout'
import SutraOver2XlLayout from '@/features/sutra/SutraOver2XlLayout'
import SutraSmOrBelowLayout from '@/features/sutra/SutraSmOrBelowLayout'
import SutraSmToLgLayout from '@/features/sutra/SutraSmToLgLayout'
import fetchUserId from '@/features/user/fetchUserId'
import useWindowWidth from '@/hooks/useWindowWidth'
import { SutraListProps } from '@/types/types'

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  if (session.user && session.user.email) {
    const currentUserId = await fetchUserId(session.user.email)

    if (!currentUserId) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    try {
      const sutraResponse = await axios.get(`${railsApiUrl}/api/v1/sutras`)
      const sutras = sutraResponse.data

      const photoResponse = await axios.get(`${railsApiUrl}/api/v1/users/${currentUserId}/photos`)
      const photos = photoResponse.data

      return {
        props: {
          sutras,
          photos,
        },
      }
    } catch (error) {
      console.error(error)
      return {
        redirect: {
          destination: '/error',
          permanent: false,
        },
      }
    }
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}

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
