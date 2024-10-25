const express = require('express');
const { authenticateUser } = require('../middleware/verifyToken');
const { authorizeRoles } = require('../middleware/auth');
const { createTask, getTasks, getTasksByDate, updateTask, deleteTask, updateTaskOrder } = require('../controllers/taskController');
const router = express.Router();

router.post('/create',authenticateUser,authorizeRoles('Manager'),createTask);
router.get('/getAll',authenticateUser,getTasks);
router.get('/:date',authenticateUser,authorizeRoles('Manager'),getTasksByDate);
router.put('/:taskId',authenticateUser,authorizeRoles('Manager'),updateTask);
router.put('/update_order_task/:id',authenticateUser,authorizeRoles('Manager'),updateTaskOrder);

router.delete('/:taskId',authenticateUser,authorizeRoles('Manager'),deleteTask);

module.exports = router;