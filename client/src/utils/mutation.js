import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation createUser($name: String!, $email: String!, $password: String!) {
        createUser(name: $name, email: $email, password: $password) {
            token
            user {
             _id
             username
             email
            }
        }
    }`;

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        user {
            _id
            username
            }
        }
    }`;

export const SAVEBOOK = gql`
    mutation saveBook($userID: ID!, $description: String!, $bookID: String!, $title: String!) {
        saveBook(userID: $userID, description: $description, bookID: $bookID, title: $title) {
        user {
            _id
            username
            email
            savedBooks {
                description
                bookID
                Title
                }
            }
        }
    }`;

export const DELETEBOOK = gql`
    mutation deleteBook($userID: ID!, $bookID: String!) {
        deleteBook(userID: $userID, bookID: $bookID) {
        user {
            _id
            username
            email
            savedBooks {
                description
                bookID
                Title
                }
            }
        }
    }`;