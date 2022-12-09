import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
             _id
             username
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
    mutation saveBook($bookData: BookInput!) {
      saveBook(bookData: $bookData) {
        _id
        username
        email
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
            }
        }
    }`;

export const DELETEBOOK = gql`
    mutation removeBook($book: BookInput!) {
        removeBook(book: $book) {
        bookId
        authors
        description
        title
        image
        link
        }
    }`;