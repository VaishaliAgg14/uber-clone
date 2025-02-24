const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();
const connectToDB = require('./db/db');
const userRouter = require('./routes/user.routes');

connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/', (req,res) => {
    res.send('Hello World');
})
app.use('/users', userRouter);

module.exports = app;
