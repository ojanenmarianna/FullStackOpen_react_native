import React from 'react'
import { View, TextInput, Pressable, StyleSheet } from 'react-native'
import { useFormik } from 'formik'
import * as yup from 'yup'

import Text from './Text'
import useSignIn from '../hooks/useSignIn'
import AuthStorage from '../utils/authStorage'

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 4,
  },
  errorInput: {
    borderColor: '#d73a4a',
  },
  errorText: {
    color: '#d73a4a',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#0366d6',
    padding: 12,
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

const initialValues = {
  username: '',
  password: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
})

export const SignInContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: yup.object().shape({
      username: yup.string().required('Username is required'),
      password: yup.string().required('Password is required'),
    }),
    onSubmit,
  })
  
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
        style={[
          styles.input,
          formik.touched.username && formik.errors.username && styles.errorInput,
        ]}
        testID="usernameInput"
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}

      <TextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        secureTextEntry
        style={[
          styles.input,
          formik.touched.password && formik.errors.password && styles.errorInput,
        ]}
        testID="passwordInput"
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}

      <Pressable
        onPress={formik.handleSubmit}
        style={styles.button}
        testID="submitButton"
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn()
  const authStorage = new AuthStorage()

  const handleSubmit = async (values) => {
    const { username, password } = values

    try {
      const { authenticate } = await signIn({ username, password })
      await authStorage.setAccessToken(authenticate.accessToken)
      console.log('Access token stored')
    } catch (e) {
      console.log(e)
    }
  }

  return <SignInContainer onSubmit={handleSubmit} />
}

export default SignIn
