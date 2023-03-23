import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import axios from 'axios'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('ゆーざー', user)
      console.log('あかうんと', account.provider)
      console.log('ぷろふぃーる', profile.sub)
      console.log('いーめーる', email) //undefined
      console.log('くれでんしゃる', credentials) //undefined

      const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/auth/:provider/callback'
      const provider = account.provider
      const uid = profile.sub

      try {
        const response = await axios.post(apiUrl, {
          provider,
          uid,
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
