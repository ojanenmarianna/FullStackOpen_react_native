import { View, StyleSheet } from 'react-native'
import { useHistory } from 'react-router-native'
import { Formik } from 'formik'
import * as yup from 'yup'

import Text from '../components/Text'
import ReviewForm from "./ReviewForm"
import theme from '../theme'
import useCreateReview from '../hooks/useCreateReview'

export const CreateReviewContainer = ({ onSubmit }) => {
    const initialValues = {
      repositoryName: '',
      ownerName: '',
      rating: '',
      text: '',
    }
  
    const validationSchema = yup.object().shape({
      repositoryName: yup.string().required('Repository name is required'),
      ownerName: yup.string().required('Repository owner name is required'),
      rating: yup
        .number()
        .required('Rating is required')
        .min(0, 'Rating must be 0-100')
        .max(100, 'Rating must be 0-100'),
      text: yup.string(),
    })
  
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
      </Formik>
    )
  }
  
  const CreateReview = () => {
    const [error, setError] = useState(null);
    const [createReview] = useCreateReview();
    const history = useHistory();
  
    const styles = StyleSheet.create({
      errorContainer: {
        margin: 15,
        height: 'auto',
        display: error ? '' : 'none',
      },
      errorText: {
        color: theme.colors.error,
      },
    })
  
    const onSubmit = async (values) => {
      const { repositoryName, ownerName, rating, text } = values;
      try {
        const response = await createReview({
          repositoryName,
          ownerName,
          rating,
          text,
        });
        history.push(`/${response.repositoryId}`);
      } catch (e) {
        setError(e.message);
        setTimeout(() => setError(null), 5000);
      }
    }
  
    return (
      <View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error?.split(':')[1]}</Text>
        </View>
        <CreateReviewContainer onSubmit={onSubmit} />
      </View>
    )
  }
  
  export default CreateReview