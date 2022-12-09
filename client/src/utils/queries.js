import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query user($userID: ID!) {
    user(userID: $userID) {
        _id
        username
        email
    }
}`;