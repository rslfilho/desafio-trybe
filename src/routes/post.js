const express = require('express');

const postController = require('../controllers/post');
const { validatePost, auth } = require('../middlewares');

const router = express.Router({ mergeParams: true });

router.post('/', auth, validatePost, postController.create);

module.exports = router;
