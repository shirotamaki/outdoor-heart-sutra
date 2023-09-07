import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Modal from 'react-modal'
import { toast } from 'react-toastify'
import { railsApiUrl } from '@/config/index'
import { DeletePhotoProps } from '@/types/types'

const DeletePhoto = ({ photoId }: DeletePhotoProps) => {
  const router = useRouter()
  const [modalIsOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${railsApiUrl}/api/v1/photos/${photoId}`)
      if (response.status === 200 || response.status === 204) {
        toast.success('写真が削除されました')
        setTimeout(() => {
          router.push('/')
        }, 2000)
      } else {
        console.error(`Error deleting photo, status code: ${response.status}`)
        toast.error('写真の削除に失敗しました')
      }
    } catch (error) {
      console.error('Error deleting photo:', error)
      toast.error('写真の削除に失敗しました')
    }
  }

  return (
    <>
      <button
        data-testid='delete-photo-button-for-over-md-layout'
        onClick={openModal}
        className='hover:opacity-50 transition-all duration-100 font-notoSans text-base font-extrabold text-gray-400 underline'
      >
        削除する
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className='fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm transition-transform duration-300 ease-in-out'
        overlayClassName='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-300 ease-in-out'
        contentLabel='Delete Photo Modal'
      >
        <div className='bg-white rounded-md px-4 pt-5 pb-4 overflow-auto shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6'>
          <div className='sm:flex sm:items-start'>
            <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
              <h3 className='font-notoSans text-lg leading-6 font-medium text-gray-900'>
                写真、位置情報、メモを削除しますか？
              </h3>
            </div>
          </div>
          <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
            <button
              data-testid='delete-photo-confirm-button-for-over-md-layout'
              type='button'
              className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 font-notoSans text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
              onClick={handleDelete}
            >
              はい
            </button>
            <button
              data-testid='delete-photo-cancel-button-for-over-md-layout'
              type='button'
              className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white font-notoSans text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm'
              onClick={closeModal}
            >
              いいえ
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default DeletePhoto
