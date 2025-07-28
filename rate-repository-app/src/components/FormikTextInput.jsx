import { View, StyleSheet, TextInput as NativeTextInput } from 'react-native'
import { useField } from 'formik'

import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: theme.colors.error,
  },
  errorInput: {
    borderColor: theme.colors.error,
  },
})

const FormikTextInput = ({ name, style, ...props }) => {
  const [field, meta, helpers] = useField(name)
  const showError = meta.touched && meta.error
  const inputStyles = [style, showError && styles.errorInput]

  return (
    <View>
      <NativeTextInput
        style={inputStyles}
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </View>
  )
}

export default FormikTextInput
