import React from 'react'
import { useNavigate } from 'react-router-native'
import { useMutation } from '@apollo/client'
import { CREATE_REVIEW } from '../graphql/mutations'
import ReviewForm from './ReviewForm'

const CreateReview = () => {
  const navigate = useNavigate()
  const [createReview] = useMutation(CREATE_REVIEW)

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values

    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: Number(rating),
            text,
          },
        },
      })

      const repoId = data.createReview.repositoryId
      navigate(`/repositories/${repoId}`)
    } catch (e) {
      console.error(e)
    }
  }

  return <ReviewForm onSubmit={onSubmit} />
}

export default CreateReview
