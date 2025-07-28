import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-native'

import { CREATE_REVIEW } from '../graphql/mutations'

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW)
  const navigate = useNavigate()

  const createReview = async ({ repositoryName, ownerName, rating, text }) => {
    const { data } = await mutate({
      variables: {
        review: {
          repositoryName,
          ownerName,
          rating: Number(rating),
          text,
        },
      },
    })

    navigate('/')
    return data.createReview;
  }

  return [createReview, result]
}

export default useCreateReview