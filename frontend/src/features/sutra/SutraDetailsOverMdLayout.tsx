import { useState } from 'react'
import Map from '@/features/map/Map'
import Note from '@/features/note/Note'
import CapturedImage from '@/features/photo/CapturedImage'
import DeletePhoto from '@/features/photo/DeletePhoto'
import EditPhoto from '@/features/photo/EditPhoto'
import PhotoUploadAndPreview from '@/features/photo/PhotoUploadAndPreview'
import { SutraDetailsProps } from '@/types/types'

const SutraDetailsOverMdLayout = ({ sutra, photo }: SutraDetailsProps) => {
  const currentLocation = {
    lat: photo.latitude,
    lng: photo.longitude,
    img: photo.cropped_image_url,
  }
  const [editNote, setEditNote] = useState(!photo.note)
  const [editMode, setEditMode] = useState(false)

  const rows = 4
  const cols = 60

  const renderNote = () => {
    if (editNote) {
      return (
        <Note
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
          <div className='w-96 h-32 rounded-lg bg-blue-200 overflow-hidden'>
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
        <div className='grid grid-cols-2 gap-4'>
          <div className='row-span-1 col-span-1'>
            <CapturedImage
              capturedImageUrl={photo.image_url}
              width={360}
              height={360}
              borderRadius='5px'
            />
          </div>
          <div className='row-start-2 col-start-1 flex justify-center'>
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
          <div className='row-span-1 col-start-2'>
            <Map markerLocation={currentLocation} />
          </div>
          <div className='grid-row-start-2 grid-col-span-2 flex justify-center'>
            住所：{photo.address}
          </div>
          <div className='grid-row-start-3 col-span-2 flex justify-center'>{renderNote()}</div>
          <div className='grid-row-start-4 col-span-2'>
            <div className='flex justify-center'>
              <div className='bg-blue-300 hover:bg-blue-200 text-gray-700 rounded-full font-notoSans text-sm mx-4 my-8 px-4 py-2'>
                <EditPhoto setEditMode={setEditMode} />
              </div>
              <div className=' bg-gray-400 hover:bg-gray-300 text-white rounded-full font-notoSans text-sm mx-4 my-8 px-4 py-2'>
                <DeletePhoto photoId={photo.id} />
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  return renderSutraDetails()
}

export default SutraDetailsOverMdLayout