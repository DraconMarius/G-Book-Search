import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation createUser($_id: ID!) {
        createUser(_id: $_id) {
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
    mutation saveBook($description: String!, $bookID: String!, $title: String!) {
        saveBook(description: $description, bookID: $bookID, title: $title) {
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
    mutation deleteBook($bookID: String!) {
        deleteBook(bookID: $bookID) {
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