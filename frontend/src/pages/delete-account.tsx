import CustomHead from '@/components/CustomHead'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import DeleteUser from '@/features/user/DeleteUser'

const DeleteAccount = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <CustomHead title='delete-account' />
      <Header />
      <main className=' bg-beige flex-grow'>
        <div className='flex flex-col justify-center items-center text-black/50 font-kinuta text-xl my-12'>
          <h1 className='text-2xl mb-12'>アカウントを削除する</h1>

          <div className='items-left'>
            <p className='pb-4'>削除すると以下の情報が全て失われます</p>
            <ul className='list-disc'>
              <li className='pb-2'>写真</li>
              <li className='pb-2'>位置情報</li>
              <li className='pb-2'>メモ</li>
            </ul>
          </div>
          <div className='mt-12'>
            <DeleteUser />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default DeleteAccount
