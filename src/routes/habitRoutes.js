// src/routes/habitRoutes.js
const express = require('express');
const { addHabit, updateHabit, getHabits, weeklyReport } = require('../controllers/habitController');

const router = express.Router();

// Define routes
router.post('/habits', addHabit); // Add Habit
router.put('/habits/:id', updateHabit); // Update Habit
router.get('/habits', getHabits); // Get All Habits
router.get('/habits/report', weeklyReport); // Weekly Report

module.exports = router;