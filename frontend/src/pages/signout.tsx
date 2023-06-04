import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import { useEffect } from 'react'

const SignOut = () => {
  const router = useRouter()

  useEffect(() => {
    const doSignOut = async () => {
      const data = await signOut({ redirect: false, callbackUrl: '/' })
      router.push(data.url)
    }

    doSignOut()
  }, [router])

  return null
}

export default SignOut
