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
  // callbacks: {
  //   async signIn(user, account, profile) {
  //     const userData = {
  //       provider: account.provider,
  //       uid: profile.id,
  //       email: user.email,
  //     };

  //     const result = await upsertUser(userData);

  //     // 必要に応じて、resultに基づいてsignInの結果を制御できます。
  //     return true;
  //   },
  // },
})
