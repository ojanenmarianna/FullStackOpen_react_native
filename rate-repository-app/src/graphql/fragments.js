import { gql } from '@apollo/client';

export const REPOSITORY_NODE_DETAILS = gql`
  fragment RepositoryNodeDetails on Repository {
    id
    fullName
    ownerName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
    createdAt
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
