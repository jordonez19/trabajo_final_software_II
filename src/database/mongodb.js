const mongoose = require("mongoose");
const { conection } = require("../config");
require("dotenv").config();

const uri = conection.MONGODB_URI;
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
