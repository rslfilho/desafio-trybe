const express = require('express');

const userController = require('../controllers/user');
const { validateLogin } = require('../middlewares');

const router = express.Router({ mergeParams: true });

router.post('/', validateLogin, userController.login);

module.exports = router;
