const express = require('express');

const serverless=require ("serverless-http");

const mongoose = require('mongoose');
const productRoute=require("./routers/products")
const cors = require('cors'); 
const signinRoute= require("./routers/signin")
const LoginRoute=require("./routers/login")
const stripe =require("./routers/stripe")
const router = express.Router();
const Product = require('./Models/ProductSchema'); // Import the product mode

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: '*' }));

mongoose
  .connect('mongodb+srv://jems:jems1000@jems0.6jlvnu9.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

app.use("/", router);
app.use("/api/products", productRoute)
app.use("/api/signin", signinRoute)
app.use("/api/login", LoginRoute)
app.use("/api/stripe", stripe)
