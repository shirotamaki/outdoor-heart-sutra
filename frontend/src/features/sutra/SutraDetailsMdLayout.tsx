import { useState } from 'react'
import Map from '@/features/map/Map'
import NoteForMdLayout from '@/features/note/NoteForMdLayout'
import CapturedImage from '@/features/photo/CapturedImage'
import DeletePhotoForMdLayout from '@/features/photo/DeletePhotoForMdLayout'
import EditPhotoForMdLayout from '@/features/photo/EditPhotoForMdLayout'
import PhotoUploadAndPreview from '@/features/photo/PhotoUploadAndPreview'
import { SutraDetailsProps } from '@/types/types'

const SutraDetailsMdLayout = ({ sutra, photo }: SutraDetailsProps) => {
  const currentLocation = {
    lat: photo.latitude,
    lng: photo.longitude,
    img: photo.cropped_image_url,
  }

  const regex = /(\d{4})-(\d{2})-(\d{2}).*/
  const shootingDate = photo.created_at.replace(regex, '$1年$2月$3日')

  const [editNote, setEditNote] = useState(!photo.note)
  const [editMode, setEditMode] = useState(false)

  const rows = 4
  const cols = 45

  const renderNote = () => {
    if (editNote) {
      return (
        <NoteForMdLayout
          photoId={photo.id}
          sutraId={sutra.id}
          photoNote={photo.note}
          setEditNote={setEditNote}
          rows={rows}
          cols={cols}
        />
      )
    } else {
      return (
        <div className='flex flex-col justify-center items-center '>
          <div className='w-366 h-32 rounded-lg bg-beige border border-gray-300 overflow-hidden'>
            <div
              data-testid='saved-note-for-md-layout'
              className='mx-2 my-1 whitespace-pre-line overflow-hidden break-words'
            >
              {photo.note}
            </div>
          </div>
          <div className=' bg-blue-500 hover:bg-blue-400 text-white rounded-full font-notoSans text-xs  ml-auto my-2 px-2 py-1'>
            <button data-testid='edit-note-button-for-md-layout' onClick={() => setEditNote(true)}>
              メモ編集
            </button>
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
          <div>
            <CapturedImage
              capturedImageUrl={photo.image_url}
              width={360}
              height={360}
              borderRadius='5px'
            />
          </div>
          <div className='flex justify-center mt-8'>
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
          <div className='mt-8 mb-2'>
            <Map markerLocation={currentLocation} />
          </div>
          <div data-testid='photo-address-for-md-layout' className='mb-8 flex flex-col'>
            住所：{photo.address}
            <div className='mt-2'>撮影日：{shootingDate}</div>
          </div>
          <div>{renderNote()}</div>
          <div className='flex justify-center content-between'>
            <div className='bg-blue-300 hover:bg-blue-200 text-gray-700 rounded-full font-notoSans text-sm mx-4 my-8 px-4 py-2'>
              <EditPhotoForMdLayout setEditMode={setEditMode} />
            </div>
            <div className=' bg-gray-400 hover:bg-gray-300 text-white rounded-full font-notoSans text-sm mx-4 my-8 px-4 py-2'>
              <DeletePhotoForMdLayout photoId={photo.id} />
            </div>
          </div>
        </div>
      )
    }
  }

  return renderSutraDetails()
}

export default SutraDetailsMdLayout
