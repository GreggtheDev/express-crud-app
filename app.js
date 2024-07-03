// Import the express module
const express = require('express');

// Create an instance of express
const app = express();

// Define the port where the server will listen
const port = 3000;

// Middleware to parse JSON. This allows the server to read JSON data sent in the body of a request.
app.use(express.json());

// Initialize an empty array to store items
let items = [];

// Initialize an ID counter for the items
let currentId = 1;

// Define a POST route at '/items' to create a new item
app.post('/items', (req, res) => {
  // Create a new item object with an ID and the data from the request body
  const newItem = {
    id: currentId++,
    ...req.body
  };

  // Add the new item to the items array
  items.push(newItem);

  // Send a response with a 201 status code (Created) and the new item
  res.status(201).json(newItem);
});

// Define a GET route at '/items' to list all items
app.get('/items', (req, res) => {
  // Send a response with the items array
  res.json(items);
});

// Define a GET route at '/items/:id' to retrieve a single item by ID
app.get('/items/:id', (req, res) => {
  // Find the item in the items array with the matching ID
  const item = items.find(i => i.id == req.params.id);

  // If the item was not found, send a 404 status code (Not Found) and an error message
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }

  // Send a response with the found item
  res.json(item);
});

// Define a PUT route at '/items/:id' to modify an existing item by ID
app.put('/items/:id', (req, res) => {
  // Find the item in the items array with the matching ID
  const item = items.find(i => i.id == req.params.id);

  // If the item was not found, send a 404 status code (Not Found) and an error message
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }

  // Merge the existing item data with the data from the request body
  Object.assign(item, req.body);

  // Send a response with the updated item
  res.json(item);
});

// Define a DELETE route at '/items/:id' to remove an item by ID
app.delete('/items/:id', (req, res) => {
  // Find the index of the item in the items array with the matching ID
  const itemIndex = items.findIndex(i => i.id == req.params.id);

  // If the item was not found, send a 404 status code (Not Found) and an error message
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  // Remove the item from the items array
  items.splice(itemIndex, 1);

  // Send a response with a 204 status code (No Content)
  res.status(204).send();
});

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
