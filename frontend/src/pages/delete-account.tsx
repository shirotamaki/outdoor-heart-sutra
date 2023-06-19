import CustomHead from '@/components/CustomHead'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import DeleteUser from '@/features/user/DeleteUser'

const DeleteAccount = () => {
  return (
    <div>
      <CustomHead title='delete-account' />
      <Header />
      <main>
        <DeleteUser />
      </main>
      <Footer />
    </div>
  )
}

export default DeleteAccount
