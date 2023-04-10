const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

mongoose.connect(uri, options)
  .then(() => {
    console.log('Connected to MongoDB');
    //console.log('Connection state:', mongoose.connection.readyState);
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });
