import React from 'react'
import { View, TextInput, Pressable, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Text from './Text'

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),
})

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

const SignUpForm = ({ onSubmit }) => {
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(5, 'Minimum 5 characters')
      .max(30, 'Maximum 30 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(5, 'Minimum 5 characters')
      .max(50, 'Maximum 50 characters'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Password confirmation is required'),
  })

  return (
    <Formik
      initialValues={{ username: '', password: '', passwordConfirmation: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <TextInput
            placeholder="Username"
            style={[
              styles.input,
              touched.username && errors.username && styles.errorInput,
            ]}
            value={values.username}
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
          />
          {touched.username && errors.username && (
            <Text style={styles.errorText}>{errors.username}</Text>
          )}

          <TextInput
            placeholder="Password"
            secureTextEntry
            style={[
              styles.input,
              touched.password && errors.password && styles.errorInput,
            ]}
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
          />
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <TextInput
            placeholder="Password confirmation"
            secureTextEntry
            style={[
              styles.input,
              touched.passwordConfirmation && errors.passwordConfirmation && styles.errorInput,
            ]}
            value={values.passwordConfirmation}
            onChangeText={handleChange('passwordConfirmation')}
            onBlur={handleBlur('passwordConfirmation')}
          />
          {touched.passwordConfirmation && errors.passwordConfirmation && (
            <Text style={styles.errorText}>{errors.passwordConfirmation}</Text>
          )}

          <Pressable onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Sign up</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  )
}

export default SignUpForm