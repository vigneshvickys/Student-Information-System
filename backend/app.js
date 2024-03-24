const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://ram:1234Ram%40@cluster0.6bqs6b2.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1); // Exit the process if unable to connect to MongoDB
});

app.get('/checkserver', (req, res) => {
  res.send('Happy Codeing');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
