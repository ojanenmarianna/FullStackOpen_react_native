import Constants from 'expo-constants'
import { StyleSheet, View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'

import RepositoryList from './RepositoryList'
import SingleRepository from './SingleRepository'
import CreateReview from './CreateReview'
import MyReviews from './MyReviews'
import AppBar from './AppBar'
import SignIn from './SignIn'
import SignUp from './SignUp'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.background,
  },
})

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/repository/:id" element={<SingleRepository />} />
        <Route path="/create-review" element={<CreateReview />} />
        <Route path="/my-reviews" element={<MyReviews />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  )
}

export default Main
