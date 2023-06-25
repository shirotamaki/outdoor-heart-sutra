import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { useState } from 'react'
import CustomHead from '@/components/CustomHead'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { railsApiUrl } from '@/config/index'
import Map from '@/features/map/Map'
import Note from '@/features/note/Note'
import CapturedImage from '@/features/photo/CapturedImage'
import DeletePhoto from '@/features/photo/DeletePhoto'
import EditPhoto from '@/features/photo/EditPhoto'
import PhotoUploadAndPreview from '@/features/photo/PhotoUploadAndPreview'
import fetchPhotoId from '@/features/photo/fetchPhotoId'
import fetchUserId from '@/features/user/fetchUserId'
import { SutraDetailsProps } from '@/types/types'

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { id } = context.query
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  try {
    const sutraResponse = await axios.get(`${railsApiUrl}/api/v1/sutras/${id}`)
    const sutra = sutraResponse.data
    const currentSutraId = sutra.id

    if (session.user && session.user.email) {
      const currentUserId = await fetchUserId(session.user.email)

      if (currentUserId !== null) {
        const photo_id = await fetchPhotoId(currentSutraId, currentUserId)

        let photo = { image_url: null }

        if (photo_id !== null) {
          const photoResponse = await axios.get(`${railsApiUrl}/api/v1/photos/${photo_id}`)
          photo = photoResponse.data
        }
        return {
          props: {
            sutra,
            photo,
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching data:', error.message, error.response)
    } else if (error instanceof Error) {
      console.error('Error fetching data:', error.message)
    } else {
      console.error('Error fetching data:', error)
    }
    return {
      notFound: true,
    }
  }
  return {
    notFound: true,
  }
}

const SutraDetails = ({ sutra, photo }: SutraDetailsProps) => {
  const currentLocation = {
    lat: photo.latitude,
    lng: photo.longitude,
    img: photo.cropped_image_url,
  }
  const [editNote, setEditNote] = useState(!photo.note)
  const [editMode, setEditMode] = useState(false)

  const renderNote = () => {
    if (editNote) {
      return (
        <Note
          photoId={photo.id}
          sutraId={sutra.id}
          photoNote={photo.note}
          setEditNote={setEditNote}
        />
      )
    } else {
      return (
        <div className='flex flex-col justify-center items-center '>
          <div className='w-80 h-32 rounded-lg bg-gray-300 overflow-hidden'>
            <div className='mx-2 my-1'>{photo.note}</div>
          </div>
          <div className=' bg-blue-500 hover:bg-blue-400 text-white rounded-full font-notoSans text-xs  ml-auto my-2 px-2 py-1'>
            <button onClick={() => setEditNote(true)}>メモ編集</button>
          </div>
        </div>
      )
    }
  }

  const renderSutraDetails = () => {
    if (editMode) {
      return (
        <div>
          <PhotoUploadAndPreview sutraId={sutra.id} photoId={photo.id} sutra={sutra} />
        </div>
      )
    } else {
      return (
        <div className='flex flex-col justify-center items-center'>
          <div className='flex justify-center mb-8'>
            <div className='text-5xl text-black/25 font-kinuta mx-4'>{sutra.kanji}</div>
            <div className='mx-4 mt-1'>
              <CapturedImage
                capturedImageUrl={photo.cropped_image_url}
                width={48}
                height={48}
                borderRadius='5px'
              />
            </div>
          </div>
          <div>
            <CapturedImage
              capturedImageUrl={photo.image_url}
              width={360}
              height={360}
              borderRadius='5px'
            />
          </div>
          <div className='mt-8 mb-2'>
            <Map markerLocation={currentLocation} />
          </div>
          <div className='mb-8'>住所：{photo.address}</div>
          <div>{renderNote()}</div>
          <div className='flex justify-center content-between'>
            <div className='bg-blue-300 hover:bg-blue-200 text-gray-700 rounded-full font-notoSans text-sm mx-4 my-8 px-4 py-2'>
              <EditPhoto setEditMode={setEditMode} />
            </div>
            <div className=' bg-gray-400 hover:bg-gray-300 text-white rounded-full font-notoSans text-sm mx-4 my-8 px-4 py-2'>
              <DeletePhoto photoId={photo.id} />
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div className='flex flex-col min-h-screen bg-beige'>
      <CustomHead title='詳細' />
      <Header />
      <main className='mx-12 my-12 flex-grow'>
          {photo.image_url === null ? (
            <div>
              <PhotoUploadAndPreview sutraId={sutra.id} photoId={photo.id} sutra={sutra} />
            </div>
          ) : (
            renderSutraDetails()
          )}
      </main>
      <Footer />
    </div>
  )
}

export default SutraDetails
