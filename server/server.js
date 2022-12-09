const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

//importing ApolloServer to set up backend
const { ApolloServer } = require('apollo-server-express');

//importing schemas from graphQL
const { typeDefs, resolvers } = require('./schemas');

//auth middleware for JWT
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

//setting up Apollo Server + auth
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
//commenting out because we are now using Apollo Server instead of our regular express
// app.use(routes);

// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });

//server open
const startApolloServer = async (typeDefs, resovlers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API Server on PORT ${PORT}`);
      coneole.log(`GraphQL @ http://localhost:${PORT}`)
    });
  });
};

startApolloServer(typeDefs, resolvers);
