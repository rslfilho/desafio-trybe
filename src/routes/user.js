const express = require('express');

const userController = require('../controllers/user');
const { validateUser } = require('../middlewares');

const router = express.Router({ mergeParams: true });

router.post('/', validateUser, userController.create);

module.exports = router;
