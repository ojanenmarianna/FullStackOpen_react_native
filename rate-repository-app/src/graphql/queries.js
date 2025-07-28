import { gql } from '@apollo/client'

import { REPOSITORY_NODE_DETAILS } from './fragments'

export const GET_REPOSITORIES = gql`
  query getRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          ...RepositoryNodeDetails
        }
        cursor
      }
    }
  }
  ${REPOSITORY_NODE_DETAILS}
`

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`

export const GET_REPOSITORY = gql`
  query getRepository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...RepositoryNodeDetails
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
  ${REPOSITORY_NODE_DETAILS}
`

export const GET_MY_REVIEWS = gql`
  query getMyReviews($first: Int, $after: String) {
    me {
      id
      username
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            rating
            text
            createdAt
            repositoryId
            repository {
              id
              fullName
            }
          }
        }
      }
    }
  }
`
