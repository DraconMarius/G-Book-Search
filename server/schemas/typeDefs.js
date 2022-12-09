const { gql } = require('apollo-server-express');

//defining schema of what data/ sctructyure graphQL will be able to return

const typeDefs = gql`

type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

type Book {
    authors: [String]
    description: String!
    bookID: String!
    image: String
    link: String
    title: String!
}


 type Auth {
        token: ID!
        user: User
}

input BookInput {
    authors: [String]
    description: String!
    bookID: String!
    image: String
    link: String
    title: String!
  } 

type Query{
    me: User
    users: [User]
    user(userID: ID!): User
}

type Mutation{
    createUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): Auth
    saveBook( book: BookInput ): User
    deleteBook( bookID: String!): User
}


`;

module.exports = typeDefs;