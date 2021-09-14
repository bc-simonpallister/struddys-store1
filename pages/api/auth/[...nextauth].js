import Providers from 'next-auth/providers'
import { gql, GraphQLClient } from 'graphql-request'
import NextAuth from 'next-auth'

const endpoint = process.env.GRAPHQL_ENDPOINT
const query = gql`
  mutation Login($email: String!, $pass: String!) {
    login(email: $email, password: $pass) {
      result
      customer {
        entityId
        firstName
        lastName
        email
      }
      }
  }
`

const options = { 
  providers : [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'BigCommerce',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Email", type: "text", placeholder: "username" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        const variables={
          "email": credentials.username, 
          "pass": credentials.password
        }

        const client = new GraphQLClient(endpoint, { headers: {
          "Authorization": "Bearer " + process.env.GRAPHQL_TOKEN
        } }) 

        const data = await client.request(query, variables)
        
        if(data.login.result === 'success'){
          console.log(data.login)
          //return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          //return data.login.customer
          const { customer } = data.login
          return {
            id: customer.entityId,
            name: `${customer.firstName} ${customer.lastName}`,
            email: customer.email
          }
        }

        return null
      }
    })
  ],
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  // pages: {
  //   signIn: "/"
  // },
  // callbacks: {
  //   async jwt(token, user) {
  //     if (user) {
  //       token.accessToken = user.token
  //     }
  
  //     return token
  //   },
  
  //   async session(session, token) {
  //     session.accessToken = token.accessToken
  //     return session
  //   }
  
  // }
}

export default (req, res) => NextAuth(req, res, options)