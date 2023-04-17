"use strict";

var mongoose = require("mongoose");
require("dotenv").config();
var uri = process.env.MONGODB_URI;
var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
mongoose.connect(uri, options).then(function () {
  console.log('Connected to MongoDB');
  //console.log('Connection state:', mongoose.connection.readyState);
})["catch"](function (err) {
  console.error('Failed to connect to MongoDB:', err);
});