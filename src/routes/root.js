const express = require('express');

const userRouter = require('./user');

const root = express.Router({ mergeParams: true });

root.use('/user', userRouter);

module.exports = root;
