const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDB = require('./db/db');
const userRouter = require('./routes/user.routes');
const captainRouter = require('./routes/captain.routes');

connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get('/', (req,res) => {
    res.send('Hello World');
})
app.use('/users', userRouter);
app.use('/captains' , captainRouter);

module.exports = app;
