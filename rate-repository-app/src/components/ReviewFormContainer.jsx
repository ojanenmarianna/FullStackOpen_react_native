import React from 'react'
import { View, TextInput, Pressable, StyleSheet } from 'react-native'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Text from './Text'

const validationSchema = Yup.object().shape({
  ownerName: Yup.string().required('Repository owner name is required'),
  repositoryName: Yup.string().required('Repository name is required'),
  rating: Yup.number()
    .required('Rating is required')
    .min(0, 'Minimum rating is 0')
    .max(100, 'Maximum rating is 100'),
  text: Yup.string().optional(),
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

export const ReviewFormContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      ownerName: '',
      repositoryName: '',
      rating: '',
      text: '',
    },
    validationSchema,
    onSubmit,
  })

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        onBlur={formik.handleBlur('ownerName')}
        style={[
          styles.input,
          formik.touched.ownerName && formik.errors.ownerName && styles.errorInput,
        ]}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
      )}

      <TextInput
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        onBlur={formik.handleBlur('repositoryName')}
        style={[
          styles.input,
          formik.touched.repositoryName && formik.errors.repositoryName && styles.errorInput,
        ]}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
      )}

      <TextInput
        placeholder="Rating (0-100)"
        keyboardType="numeric"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        onBlur={formik.handleBlur('rating')}
        style={[
          styles.input,
          formik.touched.rating && formik.errors.rating && styles.errorInput,
        ]}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.errorText}>{formik.errors.rating}</Text>
      )}

      <TextInput
        placeholder="Review"
        multiline
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        onBlur={formik.handleBlur('text')}
        style={[
          styles.input,
          { height: 100 },
          formik.touched.text && formik.errors.text && styles.errorInput,
        ]}
      />
      {formik.touched.text && formik.errors.text && (
        <Text style={styles.errorText}>{formik.errors.text}</Text>
      )}

      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  )
}
