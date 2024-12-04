const cron = require('node-cron');
const WebSocket = require('ws');
const { habits } = require('../controllers/habitController'); // Use shared habits array

let clients = []; // Track WebSocket clients

// WebSocket connection handler
const setupWebSocket = (wss) => {
    wss.on('connection', (ws) => {
        clients.push(ws);
        console.log('New client connected.');

        ws.on('close', () => {
            clients = clients.filter(client => client !== ws);
            console.log('Client disconnected.');
        });
    });
};

// Send reminders
// src/services/reminderService.js
const sendReminders = (habits) => {
    console.log('Habits array:', habits); // Debugging line

    const incompleteHabits = habits.filter(habit => {
        const today = new Date().toISOString().split('T')[0];
        return !habit.completionStatus.includes(today);
    });

    if (incompleteHabits.length > 0) {
        const message = `You have ${incompleteHabits.length} incomplete habit(s): ${incompleteHabits.map(h => h.name).join(', ')}`;
        clients.forEach(client => client.send(message));
        console.log('Reminders sent to all clients.');
    }
};



// Schedule daily reminder at 8:00 AM
const scheduleReminders = () => {
    cron.schedule('0 8 * * *', sendReminders); // Run at 8:00 AM every day
    console.log('Daily reminder scheduled for 8:00 AM.');
};

// Export all functions
module.exports = { setupWebSocket, scheduleReminders, sendReminders };
