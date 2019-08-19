import { gql } from 'apollo-boost';

export const getSubmissionsQuery = gql`
  query GetSubmissions {
      getSubmissions {
          id
          title
          updated
      }
  }
`