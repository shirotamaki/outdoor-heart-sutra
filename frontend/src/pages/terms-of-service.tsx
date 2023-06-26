import CustomHead from '@/components/CustomHead'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

const TermsOfService = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <CustomHead title='terms-of-service' />
      <Header />
      <main className='bg-beige flex-grow'>利用規約</main>
      <Footer />
    </div>
  )
}

export default TermsOfService
