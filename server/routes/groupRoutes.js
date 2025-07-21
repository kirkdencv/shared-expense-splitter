const express = require('express');
const router = express.Router();

const groupController = require('../controllers/groupController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', groupController.createGroup);

router.get('/', groupController.getUserGroups);

router.get('/:id', groupController.getGroupById);

router.put('/:id', groupController.updateGroup);

router.delete('/:id', groupController.deleteGroup);

module.exports = router;
