import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { format } from 'date-fns'

import useMyReviews from '../hooks/useMyReviews.js'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  ratingCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#0366d6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingText: {
    color: '#0366d6',
    fontWeight: 'bold',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    flexWrap: 'wrap',
  },
  repoName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    color: '#586069',
    marginLeft: 10,
    fontSize: 14,
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 5,
  },
  reviewRow: {
    flexDirection: 'row',
  },
})

const MyReviewItem = ({ review }) => {
  const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy')
  const repositoryFullName = review.repository?.fullName || 'Unknown repository'

  return (
    <View style={styles.container}>
      <View style={styles.reviewRow}>
        <View style={styles.ratingCircle}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.reviewHeader}>
            <Text style={styles.repoName}>{repositoryFullName}</Text>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
          <Text style={styles.reviewText}>{review.text || '(No review text)'}</Text>
        </View>
      </View>
    </View>
  )
}

const ItemSeparator = () => <View style={styles.separator} />

const MyReviews = () => {
  const { reviews, loading } = useMyReviews()

  if (loading) return <Text>Loading...</Text>

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <MyReviewItem review={item} />}
    />
  )
}

export default MyReviews
