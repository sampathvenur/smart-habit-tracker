const { sendReminders } = require('./services/reminderService');

// Dummy habits array (for testing)
const habits = [
  { name: 'Drink water', completionStatus: ['2024-12-03'] },
  { name: 'Exercise', completionStatus: [] }
];

// Run the reminder function manually
sendReminders(habits);
