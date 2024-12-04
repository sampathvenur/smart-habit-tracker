// src/controllers/habitController.js

// In-memory storage for habits
// const habits = [];
const { logReport } = require('../utils/logger');

// Add Habit
// src/controllers/habitController.js
let habits = [
    { name: 'Drink 8 glasses of water', completionStatus: [] },
    { name: 'Exercise for 30 minutes', completionStatus: [] }
];

module.exports = { habits };

const addHabit = (req, res) => {
    const { name, dailyGoal } = req.body;

    if (!name || !dailyGoal) {
        return res.status(400).json({ status: 'error', error: 'Name and daily goal are required.' });
    }

    const newHabit = {
        id: habits.length + 1,
        name,
        dailyGoal,
        completionStatus: [],
    };

    habits.push(newHabit);
    res.status(201).json({ status: 'success', data: newHabit });
};

// Update Habit
const updateHabit = (req, res) => {
    const { id } = req.params;
    const habit = habits.find(h => h.id === parseInt(id));

    if (!habit) {
        return res.status(404).json({ status: 'error', error: 'Habit not found.' });
    }

    habit.completionStatus.push(new Date().toISOString().split('T')[0]); // Mark completed for today
    res.status(200).json({ status: 'success', data: habit });
};

// Get Habits
const getHabits = (req, res) => {
    res.status(200).json({ status: 'success', data: habits });
};

// Weekly Report
const weeklyReport = (req, res) => {
    const today = new Date();
    const last7Days = [...Array(7)].map((_, i) => {
        const date = new Date();
        date.setDate(today.getDate() - i);
        return date.toISOString().split('T')[0];
    });

    const report = habits.map(habit => ({
        name: habit.name,
        completion: last7Days.map(date => habit.completionStatus.includes(date) ? '✔️' : '❌'),
    }));

    // Log report to file
    logReport(report);

    res.status(200).json({ status: 'success', data: report });
};

module.exports = { habits }; // Export the habits array
module.exports = { addHabit, updateHabit, getHabits, weeklyReport };