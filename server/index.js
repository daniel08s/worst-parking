const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');

require('dotenv').config({ path: 'variables.env' });
const { typeDefs } = require('./graphql/schema');
const { resolvers } = require('./graphql/resolvers');

const PORT = process.env.PORT || 4000;

// Create GraphQL schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: `http://localhost:${PORT}/graphql`,
    // List of possible settings below
    settings: {
      'general.betaUpdates': false,
      'editor.cursorShape': 'line', // possible values: 'line', 'block', 'underline'
      'editor.fontSize': 14,
      'editor.fontFamily': `'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace`,
      'editor.theme': 'dark', // possible values: 'dark', 'light'
      'editor.reuseHeaders': true,
      'request.credentials': 'omit', // possible values: 'omit', 'include', 'same-origin'
      'tracing.hideTracingResponse': true,
    }
  }
});

// Initializes express server
const app = express();

// Setup GraphQL Middleware
server.applyMiddleware({ app });

// Connects to database
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('DB connected 🎉'))
  .catch(err => console.error(err));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
