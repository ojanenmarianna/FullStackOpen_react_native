import { gql } from '@apollo/client';

export const REPOSITORY_NODE_DETAILS = gql`
  fragment RepositoryNodeDetails on Repository {
    id
      fullName
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      url
  }
`

export const PAGE_INFO = gql`
  fragment PageInfo on PageInfo {
    totalCount
    hasNextPage
    endCursor
    startCursor
  }
`
