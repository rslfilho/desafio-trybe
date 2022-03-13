const express = require('express');

const userRouter = require('./user');
const loginRouter = require('./login');
const postRouter = require('./post');

const root = express.Router({ mergeParams: true });

root.use('/user', userRouter);
root.use('/login', loginRouter);
root.use('/post', postRouter);

module.exports = root;
