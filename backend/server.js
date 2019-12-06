//Mongoose - allows us to set up schemas for the data we store in our MongoDB database. We will also set up our database connection using Mongoose.
const mongoose = require('mongoose');

//Express - framework for NodeJS. Handles our routing and  connection info (port, etc.).
const express = require('express');

//Morgan - Handles logging stuff for databases.
const logger = require('morgan');

//Body-Parser - Makes sure the body of our requests is formatted correctly (in this case, we'll use JSON).
const bodyParser = require('body-parser');

//Import the getSecret function from the secret.js file
const getSecret = require('./secret');

//Import the Mongoose Schema for our data
const Data = require('./DataSchema');

//Constant to hold the port that we are going to use to connect
const API_PORT = 3001;

//Create an Express app that will run on our Node server and route our requests
const app = express();

//Create an Express router which actually handles the routing
const router = express.Router();
