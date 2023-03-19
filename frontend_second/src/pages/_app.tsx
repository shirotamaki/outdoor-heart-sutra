import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'

function MyApp({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
