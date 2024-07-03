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
  
  // Read Operation
  app.get('/items', (req, res) => {
    res.json(items);
  });
  
  app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id == req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  });
  
  // Updte Operation
  app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id == req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    Object.assign(item, req.body);
    res.json(item);
  });
  
  // Delete Operation
  app.delete('/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id == req.params.id);
    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }
    items.splice(itemIndex, 1);
    res.status(204).send();
  });
  