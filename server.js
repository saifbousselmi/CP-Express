require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT ;

// Custom middleware to check if the request is within working hours
app.use((req, res, next) => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.status(403).send('The service is only available during working hours (Monday to Friday, 09:00 - 17:00).');
  }
});

// Serve static files from the 'assets' folder
app.use(express.static(__dirname));

// Define routes
app.get('/', (req, res) => {
  res.sendFile(__dirname+"/assets/index.html");
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

