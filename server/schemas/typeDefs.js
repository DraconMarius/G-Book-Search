const { gql } = require('apollo-server-express');

//defining schema of what data/ sctructyure graphQL will be able to return

const typeDefs = gql`

type User {
    _id: ID,
    username: String!
    email: String!
    password: String!
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


type Query{
    users: [User]
    user(userID: ID!): User
}

type mutation{
    createUser(username: String!, email: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(userID: ID!, description: String!, bookID: String!, title: String! ): User
    deleteBook(userID: ID!, bookID: String!): User
}


`;

module.exports = typeDefs;