const express = require('express');

const userRouter = require('./user');
const loginRouter = require('./login');

const root = express.Router({ mergeParams: true });

root.use('/user', userRouter);
root.use('/login', loginRouter);

module.exports = root;
