import { useMutation } from '@apollo/client'
import { useApolloClient } from '@apollo/client'
import { useNavigate } from 'react-router-native'

import useAuthStorage from './useAuthStorage'
import { AUTHENTICATE } from '../graphql/mutations'

const useSignIn = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const navigate = useNavigate()

  const [mutate, result] = useMutation(AUTHENTICATE)

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: {
        credentials: { username, password },
      },
    })

    await authStorage.setAccessToken(response.data.authenticate.accessToken)
    await apolloClient.resetStore()
    navigate('/')

    return response.data
  }
  
  return [signIn, result]
}

export default useSignIn
