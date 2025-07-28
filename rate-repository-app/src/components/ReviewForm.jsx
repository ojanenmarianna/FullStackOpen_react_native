import { View, TouchableOpacity, StyleSheet } from 'react-native'
import FormikTextInput from './FormikTextInput'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderColor: theme.colors.textPrimary,
    borderWidth: 1,
    borderRadius: 3,
    height: 50,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: theme.colors.secondary,
    alignItems: 'center',
    flexGrow: 1,
    padding: 17,
    borderRadius: 3,
    height: 50,
  },
})

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <FormikTextInput
          style={styles.input}
          name="ownerName"
          placeholder="Repository owner name"
        />
      </View>
      <View style={styles.inputContainer}>
        <FormikTextInput
          style={styles.input}
          name="repositoryName"
          placeholder="Repository name"
        />
      </View>
      <View style={styles.inputContainer}>
        <FormikTextInput
          style={styles.input}
          name="rating"
          placeholder="Rating between 0 and 100"
        />
      </View>
      <View style={styles.inputContainer}>
        <FormikTextInput
          style={styles.input}
          name="text"
          placeholder="Review"
          multiline
        />
      </View>
      <TouchableOpacity onPress={onSubmit}>
        <View style={styles.buttonContainer}>
          <Text color="textSecondary" fontWeight="bold">
            Create a review
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default ReviewForm
