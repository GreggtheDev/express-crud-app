const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Starting the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  // Data storage
  let items = [];
let currentId = 1;

// Create a new item
app.post('/items', (req, res) => {
    const newItem = {
      id: currentId++,
      ...req.body
    };
    items.push(newItem);
    res.status(201).json(newItem);
  });
  