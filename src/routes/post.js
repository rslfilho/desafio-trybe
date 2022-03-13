const express = require('express');

const postController = require('../controllers/post');
const { validatePost, auth } = require('../middlewares');

const router = express.Router({ mergeParams: true });

router.post('/', auth, validatePost, postController.create);
router.get('/', auth, postController.getAll);
router.get('/:id', auth, postController.getById);
router.delete('/:id', auth, postController.remove);

module.exports = router;
