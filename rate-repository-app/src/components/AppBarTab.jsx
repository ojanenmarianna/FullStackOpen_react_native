import { Pressable, StyleSheet, View } from 'react-native'
import { Link } from 'react-router-native'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  tab: {
    padding: 15,
  },
  text: {
    color: 'white',
    fontWeight: theme.fontWeights.bold,
  },
})

const AppBarTab = ({ to, title }) => {
  return (
    <Link to={to} component={Pressable} style={styles.tab}>
      <Text style={styles.text}>{title}</Text>
    </Link>
  )
}

export default AppBarTab