// server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const habitRoutes = require('./src/routes/habitRoutes');
const { setupWebSocket, scheduleReminders } = require('./src/services/reminderService');

const app = express();
const PORT = 3000;

// Middleware for parsing JSON requests
app.use(express.json());
app.use('/api', habitRoutes);

// HTTP server
const server = http.createServer(app);

// WebSocket server
const wss = new WebSocket.Server({ server });

// Initialize WebSocket with the server
setupWebSocket(wss);

// Schedule daily reminders
scheduleReminders();

// WebSocket connection setup
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
    });
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Default route
app.get('/', (req, res) => {
    res.send('Smart Habit Tracker API is running!');
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

