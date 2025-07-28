import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { format } from 'date-fns'

const styles = StyleSheet.create({
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
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    color: '#586069',
    marginLeft: 10,
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 20,
  },
  reviewRow: {
    flexDirection: 'row',
  },
})

const ReviewItem = ({ review }) => {
  const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy')

  return (
    <View style={styles.container}>
      <View style={styles.reviewRow}>
        <View style={styles.ratingCircle}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.reviewHeader}>
            <Text style={styles.username}>{review.user.username}</Text>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
          <Text style={styles.reviewText}>{review.text}</Text>
        </View>
      </View>
    </View>
  )
}

export default ReviewItem
