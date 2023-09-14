import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useSession, getSession } from 'next-auth/react'
import CustomHead from '@/components/CustomHead'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { railsApiUrl } from '@/config/index'
import SutraCalculator from '@/features/sutra/SutraCalculator'
import fetchUserId from '@/features/user/fetchUserId'
import { MyPageProps } from '@/types/types'

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getSession(context)

  if (!session || !session.user || !session.user.email) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const currentUserId = await fetchUserId(session.user.email)

  const photosResponse = await axios.get(`${railsApiUrl}/api/v1/users/${currentUserId}/photos`)
  const photos = photosResponse.data

  const UserResponse = await axios.get(`${railsApiUrl}/api/v1/users/${currentUserId}`)
  const user = UserResponse.data

  return {
    props: {
      photos,
      user,
    },
  }
}

const MyPage = ({ photos, user }: MyPageProps) => {
  const { data: session } = useSession()

  const regex = /(\d{4})-(\d{2})-(\d{2}).*/
  const formattedDate = user.created_at.replace(regex, '$1年$2月$3日')

  return (
    <div className='flex flex-col min-h-screen'>
      <CustomHead title='マイページ' ogUrl='https://www.outdoor-heart-sutra.com/mypage' />
      <Header />
      <main className=' bg-beige flex-grow'>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='mt-12 mb-2'>
            <Image
              src={session?.user?.image || ''}
              alt='UserIcon'
              width={100}
              height={100}
              style={{ borderRadius: '50px' }}
            />
          </h1>
          <div
            className='font-kinuta text-mainBlack text-base md:text-xl mb-12'
            data-testid='user-name'
          >
            {user.name}
          </div>

          <div className='grid grid-rows-1 grid-cols-3 font-kinuta text-mainBlack text-base md:text-xl mb-4'>
            <div className='justify-self-end col-span-1'>出家日：</div>
            <div className='justify-self-start col-span-2'>{formattedDate}</div>
          </div>
          <div className='font-kinuta text-mainBlack text-base md:text-xl mb-12 flex flex-col justify-center items-center'>
            <div>写経した総数</div>
            <div>
              <SutraCalculator photos={photos} />
            </div>
          </div>
          <Link
            href='/delete-account'
            className='hover:opacity-50 transition-all duration-100 font-kinuta text-sm md:text-lg text-gray-400 underline mb-8'
          >
            退会する
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default MyPage
