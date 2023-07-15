import axios from 'axios'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import Modal from 'react-modal'
import { railsApiUrl } from '@/config/index'

const DeleteUser = () => {
  const { data: session } = useSession()
  const [modalIsOpen, setIsOpen] = useState(false)

  const handleDeleteUser = async () => {
    if (!session || !session.user) {
      console.error('セッションが存在しません')
      return
    }

    try {
      const response = await axios.delete(`${railsApiUrl}/api/v1/users/${session.user.email}`)

      if (response.status === 204) {
        signOut({
          callbackUrl: `/`,
        })
      } else {
        console.error('アカウント削除に失敗しました')
      }
    } catch (error) {
      console.error('エラー', error)
    }
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  if (session) {
    return (
      <>
        <button
          onClick={openModal}
          className='hover:opacity-50 transition-all duration-100 text-base bg-red-500 hover:bg-red-700 text-white font-notoSans py-2 px-4 rounded-full'
        >
          アカウントを削除する
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className='fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm transition-transform duration-300 ease-in-out'
          overlayClassName='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-300 ease-in-out'
          contentLabel='Example Modal'
        >
          <div className='bg-white rounded-md px-4 pt-5 pb-4 overflow-auto shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6'>
            <div className='sm:flex sm:items-start'>
              <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                <h3 className='font-notoSans text-lg leading-6 font-medium text-gray-900'>
                  アカウントを削除しますか？
                </h3>
              </div>
            </div>
            <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
              <button
                type='button'
                className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 font-notoSans text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
                onClick={handleDeleteUser}
              >
                はい
              </button>
              <button
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
  return null
}

export default DeleteUser
