import React from 'react'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-native'
import { CREATE_USER } from '../graphql/mutations'
import SignUpForm from './SignUpForm'
import useSignIn from '../hooks/useSignIn'

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER)
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const handleSubmit = async ({ username, password }) => {
    try {
      await createUser({ variables: { user: { username, password } } })
      await signIn({ username, password })
      navigate('/')
    } catch (e) {
      console.log(e)
    }
  }

  return <SignUpForm onSubmit={handleSubmit} />
}

export default SignUp
