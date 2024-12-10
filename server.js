const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Path to store user data
const dataFilePath = path.join(__dirname, 'userData.json');

// Ensure the file exists
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, JSON.stringify([]));
}

// API to save or update user data
app.post('/api/saveUserData', (req, res) => {
  const { telegramId, telegramUsername, websiteClick, joinedGroup } = req.body;

  if (!telegramId || !telegramUsername) {
    return res.status(400).send({ success: false, message: 'Missing required fields' });
  }

  // Read existing data
  let userData = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

  // Check if the user already exists
  const userIndex = userData.findIndex((user) => user.telegramId === telegramId);

  if (userIndex > -1) {
    // Update existing user
    userData[userIndex] = { telegramId, telegramUsername, websiteClick, joinedGroup };
  } else {
    // Add a new user
    userData.push({ telegramId, telegramUsername, websiteClick, joinedGroup });
  }

  // Save back to the file
  fs.writeFileSync(dataFilePath, JSON.stringify(userData, null, 2));

  res.status(200).send({ success: true, message: 'User data saved successfully' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
