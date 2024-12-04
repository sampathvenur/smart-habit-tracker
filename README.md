# Smart Habit Tracker with Daily Reminders

## Overview

This project is a **Smart Habit Tracker** that helps users track and manage their habits with the help of daily reminders. The project provides an API to add, update, retrieve, and track habits. Additionally, it sends daily reminders for incomplete habits using a WebSocket connection and Cron jobs.

The project is built using **Node.js**, **Express**, and **WebSocket**, with a simple backend and no frontend.

### Key Features:
- Add a habit
- Update a habit
- Get a habit
- View weekly habit completion report
- Receive daily reminders via WebSocket

---

## Table of Contents
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [WebSocket Setup](#websocket-setup)
- [Cron Job Setup](#cron-job-setup)
- [Testing](#testing)
- [Notes for Beginners](#notes-for-beginners)

---

## Technologies Used

- **Node.js**: JavaScript runtime to build the backend.
- **Express.js**: Web framework to build RESTful APIs.
- **WebSocket**: For real-time communication between clients and the server.
- **node-cron**: To schedule daily reminders.
- **In-memory storage**: For simplicity, habit data is stored in memory (no database used).

---

## Setup Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/smart-habit-tracker.git
```

### Step 2: Install Dependencies

Navigate to the project directory and install the required dependencies.

```bash
cd smart-habit-tracker
npm install
```

### Step 3: Run the Application

Start the server by running:

```bash
node server.js
```

The server will run on port `3000` by default. You can access the API via `http://localhost:3000`.

---

## Folder Structure

Here’s the folder structure of the project:

```
smart-habit-tracker/
│
├── src/
│   ├── controllers/
│   │   └── habitController.js        # Handles the logic for habit creation, update, retrieval
│   ├── services/
│   │   └── reminderService.js        # Contains WebSocket and Cron logic for reminders
│   ├── triggerReminder.js           # Used to manually trigger the reminder process
│   └── utils/                       # Helper functions (e.g., WebSocket setup)
│
├── server.js                        # Main entry point of the application
├── package.json                     # Project dependencies and scripts
└── README.md                        # This file
```

---

## API Endpoints

### 1. **Add Habit**
   - **URL**: `/habits`
   - **Method**: `POST`
   - **Request Body**:
     ```json
     {
       "name": "Exercise",
       "completionStatus": []
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Habit added successfully."
     }
     ```

### 2. **Update Habit**
   - **URL**: `/habits/:id`
   - **Method**: `PUT`
   - **Request Body**:
     ```json
     {
       "name": "Exercise",
       "completionStatus": ["2024-12-03"]
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Habit updated successfully."
     }
     ```

### 3. **Get Habit**
   - **URL**: `/habits/:id`
   - **Method**: `GET`
   - **Response**:
     ```json
     {
       "id": 1,
       "name": "Exercise",
       "completionStatus": ["2024-12-03"]
     }
     ```

### 4. **Get Weekly Habit Report**
   - **URL**: `/habits/weekly-report`
   - **Method**: `GET`
   - **Response**:
     ```json
     {
       "weeklyReport": [
         {
           "name": "Exercise",
           "completedOn": 5
         },
         {
           "name": "Drink Water",
           "completedOn": 3
         }
       ]
     }
     ```

---

## WebSocket Setup

WebSockets allow real-time communication between the server and clients. This project uses WebSockets to send daily reminders to connected clients.

### How It Works:

1. The server listens for WebSocket connections on port `3000`.
2. When a client connects, they receive a daily reminder if they have incomplete habits.
3. Clients will be notified via WebSocket messages.

### Example of Using WebSocket in Postman:
1. Open Postman and create a **WebSocket** request to the URL: `ws://localhost:3000`.
2. You should now be able to receive real-time reminders.

---

## Cron Job Setup

We use **node-cron** to schedule daily reminders for incomplete habits. The job is set to run every day at 8:00 AM.

### How It Works:
1. The `cron.schedule('0 8 * * *', sendReminders)` line in `reminderService.js` triggers the `sendReminders` function at 8:00 AM daily.
2. The `sendReminders` function checks for incomplete habits and sends reminders to all connected WebSocket clients.

---

## Testing

### 1. **API Testing with Postman:**

To test the API:
- Add a habit: Send a `POST` request to `/habits`.
- Update a habit: Send a `PUT` request to `/habits/:id`.
- Retrieve a habit: Send a `GET` request to `/habits/:id`.
- Get weekly report: Send a `GET` request to `/habits/weekly-report`.

### 2. **WebSocket Testing with Postman:**

To test WebSocket:
- Open Postman and create a WebSocket request to `ws://localhost:3000`.
- Once connected, you should receive reminders for incomplete habits (if any).

---

## Notes for Beginners

### What Is WebSocket?
WebSocket is a protocol used to create a full-duplex communication channel over a single, long-lived connection between the client and server. It is ideal for real-time applications, such as live chat or reminders.

### What Is Cron?
Cron is a time-based job scheduler in Unix-like operating systems. In this project, we use `node-cron` to run specific tasks at scheduled times. In this case, it's used to send daily reminders.

---

## Final Thoughts

This project is a simple and practical example of building a habit tracker with real-time notifications. You can extend this project by adding more features like user authentication, database storage, and advanced habit tracking analytics.

---
