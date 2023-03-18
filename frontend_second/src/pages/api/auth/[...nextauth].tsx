import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import axios from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt(token, user) {
      if (user) {
        const response = await axios.post(`${apiUrl}/auth/google/callback`, {
          access_token: user.accessToken,
        })
        token.id = response.data.id
      }
      return token
    },
    async session(session, token) {
      session.id = token.id
      return session
    },
  },
})
