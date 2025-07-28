import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = () => {
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  })
  console.log('useRepositories data:', data)
  console.log('error:', error)

  return {
    repositories: data?.repositories,
    loading,
    refetch,
  }
}

export default useRepositories