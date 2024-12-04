// src/utils/logger.js
const fs = require('fs');
const path = require('path');

// Log weekly reports
const logReport = (report) => {
    const logPath = path.join(__dirname, '../../logs');
    if (!fs.existsSync(logPath)) {
        fs.mkdirSync(logPath);
    }

    const filePath = path.join(logPath, `weekly-report-${new Date().toISOString().split('T')[0]}.txt`);
    const reportContent = report.map(habit => 
        `Habit: ${habit.name}\nCompletion: ${habit.completion.join(' ')}\n\n`
    ).join('---\n');

    fs.writeFileSync(filePath, reportContent, 'utf8');
    console.log(`Weekly report saved to ${filePath}`);
};

module.exports = { logReport };
