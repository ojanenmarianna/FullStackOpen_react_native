import { useQuery } from '@apollo/client'
import { GET_MY_REVIEWS } from '../graphql/queries'

const useMyReviews = () => {
  const { data, loading, error } = useQuery(GET_MY_REVIEWS, {
    fetchPolicy: 'cache-and-network',
  })

  const reviews = data?.me?.reviews?.edges.map(edge => edge.node) || []

  return { reviews, loading, error }
}

export default useMyReviews
