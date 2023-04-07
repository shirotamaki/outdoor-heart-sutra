import axios from 'axios'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!account) {
        return false
      }

      const provider = account.provider
      const uid = user.id
      const name = user.name
      const email = user.email

      try {
        const response = await axios.post(`${apiUrl}/auth/${provider}/callback`, {
          provider,
          uid,
          name,
          email,
        })

        if (response.status === 200) {
          return true
        } else {
          return false
        }
      } catch (error) {
        console.log('エラー', error)
        return false
      }
    },
  },
})
