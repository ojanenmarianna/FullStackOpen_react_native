import React from 'react'
import { FlatList, View } from 'react-native'
import { useParams } from 'react-router-native'
import { useQuery } from '@apollo/client'
import { GET_REPOSITORY } from '../graphql/queries'
import RepositoryItem from './RepositoryItem'
import ReviewItem from './ReviewItem'

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  })

  if (loading) return null;
  if (error) return <Text>Error: {error.message}</Text>

  const repository = data.repository
  const reviews = repository.reviews.edges.map(edge => edge.node)

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryItem item={repository} showButton />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
    />
  )
}

export default SingleRepository