import React from 'react'
import { ReviewFormContainer } from './ReviewFormContainer'
import useCreateReview from '../hooks/useCreateReview'

const ReviewForm = () => {
  const [createReview] = useCreateReview()

  const handleSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values

    try {
      await createReview({ ownerName, repositoryName, rating: Number(rating), text })
      console.log('Review submitted:', {
        ownerName,
        repositoryName,
        rating: Number(rating),
        text,
      })

    } catch (e) {
      console.error(e)
    }
  }

  return <ReviewFormContainer onSubmit={handleSubmit} />
}

export default ReviewForm
