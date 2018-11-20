const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

// Connects to database
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('DB connected 🎉'))
  .catch(err => console.error(err));

mongoose.set('useFindAndModify', false);

// Initializes express server
const app = express();

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
