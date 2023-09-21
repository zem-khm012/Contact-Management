const { log } = require('console');
const mongoose = require('mongoose');
const dotenv=require("dotenv").config({path:'../../.env'})

//connecting database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error: ' + err));


