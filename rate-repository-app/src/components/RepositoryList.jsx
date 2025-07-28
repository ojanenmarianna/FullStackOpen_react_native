import React, { useState } from 'react'
import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native'
import { useNavigate } from 'react-router-native'
import { Picker } from '@react-native-picker/picker'
import { useDebounce } from 'use-debounce'

import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import theme from '../theme'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  pickerContainer: { padding: 10, backgroundColor: theme.colors.background },
  searchInput: {
    marginHorizontal: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryListHeader = ({ sortOption, setSortOption, searchKeyword, setSearchKeyword }) => (
  <View>
    <TextInput
      style={styles.searchInput}
      placeholder="Search repositories"
      value={searchKeyword}
      onChangeText={setSearchKeyword}
      autoCapitalize="none"
      autoCorrect={false}
      testID="searchInput"
    />

    <View style={styles.pickerContainer}>
      <Picker selectedValue={sortOption} onValueChange={setSortOption}>
        <Picker.Item label="Latest repositories" value="LATEST" />
        <Picker.Item label="Highest rated repositories" value="HIGHEST" />
        <Picker.Item label="Lowest rated repositories" value="LOWEST" />
      </Picker>
    </View>
  </View>
)

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { sortOption, setSortOption, searchKeyword, setSearchKeyword } = this.props

    return (
      <RepositoryListHeader
        sortOption={sortOption}
        setSortOption={setSortOption}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
    )
  }

  render() {
    const { repositories, navigate } = this.props

    const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
      : []

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
            <RepositoryItem item={item} testID="repositoryItem" />
          </Pressable>
        )}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
      />
    )
  }
}

const RepositoryList = () => {
  const navigate = useNavigate()

  const [sortOption, setSortOption] = useState('LATEST')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500)

  let orderBy = 'CREATED_AT'
  let orderDirection = 'DESC'

  if (sortOption === 'HIGHEST') {
    orderBy = 'RATING_AVERAGE'
    orderDirection = 'DESC'
  } else if (sortOption === 'LOWEST') {
    orderBy = 'RATING_AVERAGE'
    orderDirection = 'ASC'
  }

  const { repositories } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearchKeyword,
    first: 10,
  })

  return (
    <RepositoryListContainer
      repositories={repositories}
      sortOption={sortOption}
      setSortOption={setSortOption}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      navigate={navigate}
    />
  )
}

export default RepositoryList