
const express = require('express');
const router = express.Router();
const HabitController = require('../controllers/tasksControllers');

router.post('/', HabitController.createHabit);
router.get('/', HabitController.getAllHabit);
router.put('/:id', HabitController.updateHabit);
router.put('/deleted/:id', HabitController.DeletedHabit);
router.put('/done/:id', HabitController.DoneHabit);

module.exports = router;
