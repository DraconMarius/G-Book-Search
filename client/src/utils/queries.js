import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query user($userID: ID!) {
    user(userID: $userID) {
        _id
        username
        email
    }
}`;

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
          bookId
          authors
          description
          title
          image
          link
      }
    }
  }
`;