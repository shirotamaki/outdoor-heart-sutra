import CustomHead from '@/components/CustomHead'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

const PrivacyPolicy = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <CustomHead title='privacy-policy' />
      <Header />
      <main className='bg-beige flex-grow'>
        <h1>プライバシーポリシー</h1>
      </main>
      <Footer />
    </div>
  )
}

export default PrivacyPolicy
