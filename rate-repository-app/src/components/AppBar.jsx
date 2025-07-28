import { View, StyleSheet, ScrollView, Pressable } from 'react-native'
import Constants from 'expo-constants'
import { useApolloClient, useQuery } from '@apollo/client'
import { useNavigate } from 'react-router-native'

import { ME } from '../graphql/queries'
import useAuthStorage from '../hooks/useAuthStorage'
import theme from '../theme'
import AppBarTab from './AppBarTab'
import Text from './Text'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    paddingLeft: 10,
  },
  scroll: {
      flexDirection: 'row',
  },
  tab: {
    padding: 15,
  },
  text: {
    color: 'white',
    fontWeight: theme.fontWeights.bold,
  },
})

const SignOutTab = ({ title }) => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await authStorage.removeAccessToken()
    await apolloClient.resetStore()
    navigate('/')
  }

  return (
    <Pressable onPress={handleSignOut} style={styles.tab}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}

const AppBar = () => {
  const { data } = useQuery(ME)

  const signedIn = data?.me

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scroll}>
        <AppBarTab title="Repositories" to="/" />
        {signedIn ? (
          <>
            <AppBarTab title="Create a review" to="/create-review" />
            <AppBarTab title="My reviews" to="/my-reviews" />
            <SignOutTab title="Sign out" />
          </>
        ) : (
          <>
            <AppBarTab title="Sign in" to="/signin" />
            <AppBarTab title="Sign up" to="/signup" />
          </>
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar