import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = (variables) => {
  const { data, loading, fetchMore, refetch } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
  })

  const repositories = data?.repositories

  return { repositories, loading, fetchMore, refetch }
}

export default useRepositories