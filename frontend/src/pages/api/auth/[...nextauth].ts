import axios, { AxiosError } from 'axios'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { clientId, clientSecret, railsApiUrl, nextSecret } from '@/config/index'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: clientId,
      clientSecret: clientSecret,
    }),
  ],
  secret: nextSecret,
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
        const response = await axios.post(`${railsApiUrl}/api/v1/users`, {
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
        const axiosError = error as AxiosError
        if (axiosError.response) {
          // サーバーからのレスポンスが存在する場合
          console.error('サーバーからのレスポンス:', axiosError.response.data)
          console.error('ステータスコード:', axiosError.response.status)
          console.error('ヘッダー:', axiosError.response.headers)
        } else if (axiosError.request) {
          // リクエストが送信されたが、サーバーからのレスポンスがない場合
          console.error('サーバーからのレスポンスがありません:', axiosError.request)
        } else {
          // その他のエラー
          console.error('その他のエラーです:', axiosError.message)
        }
        return false
      }
    },
  },
})
