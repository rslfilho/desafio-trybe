const express = require('express');

const userController = require('../controllers/user');
const { validateUser, auth } = require('../middlewares');

const router = express.Router({ mergeParams: true });

router.post('/', validateUser, userController.create);
router.get('/', auth, userController.getAll);
router.get('/:id', auth, userController.getById);
router.delete('/me', auth, userController.remove);

module.exports = router;
