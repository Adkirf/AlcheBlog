import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord";
import axios from "axios"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
    clientId: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET
  })
    // ...add more providers here
  ],
  secret: process.env.SECRET,
  callbacks: {
    async signIn({user}){

      const res = await axios.post("http://localhost:8080/api/user",user)
      return true;
    },
    async session({session, token, user}){
      const {name, picture, sub} = token;
      const obj  = {name, picture, sub} 
      return obj;
    }
  }
}

export default NextAuth(authOptions)