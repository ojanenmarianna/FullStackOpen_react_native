import { View, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native'

import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  topSection: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 15,
  },
  infoContainer: {
    flexShrink: 1,
  },
  fullName: {
    fontWeight: theme.fontWeights.bold,
    marginBottom: 4,
  },
  description: {
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  language: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    color: 'white',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: 'hidden',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontWeight: theme.fontWeights.bold,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginTop: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }
})

const formatThousands = value =>
  value >= 1000 ? `${(value / 1000).toFixed(1)}k` : String(value)

const RepositoryItem = ({ item, showButton }) => {
  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.topSection}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.infoContainer}>
          <Text style={styles.fullName} testID='fullName' fontSize="subheading" fontWeight="bold">
            {item.fullName}
          </Text>
          <Text testID='description' style={styles.description}>{item.description}</Text>
          <Text testID='language' style={styles.language}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{formatThousands(item.stargazersCount)}</Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{formatThousands(item.forksCount)}</Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.reviewCount}</Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.ratingAverage}</Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
      <View>
        {showButton && (
          <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(item.url)}>
            <Text style={styles.buttonText}>Open in GitHub</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default RepositoryItem
