const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const groupController = require('../controllers/groupController');

// Protect all group routes
router.post('/', authMiddleware, groupController.createGroup);
router.get('/', authMiddleware, groupController.getGroups);
router.get('/:id', authMiddleware, groupController.getGroupById);
router.put('/:id', authMiddleware, groupController.updateGroup);
router.delete('/:id', authMiddleware, groupController.deleteGroup);

module.exports = router;
