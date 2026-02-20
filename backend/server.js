const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Sample projects
const projects = [
  {
    id: 1,
    title: 'Task Manager App',
    description: 'Fullstack task management app with REST API and React frontend.',
    tech: ['Node.js', 'Express', 'SQLite', 'Vanilla JS']
  },
  {
    id: 2,
    title: 'E-commerce Prototype',
    description: 'Shopping cart, product pages, and checkout flow.',
    tech: ['Node.js', 'Express', 'Stripe', 'HTML/CSS']
  },
  {
    id: 3,
    title: 'Realtime Chat',
    description: 'WebSocket-powered realtime chat with rooms and presence.',
    tech: ['Node.js', 'Socket.io', 'React']
  }
];

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

const CONTACTS_FILE = path.join(__dirname, 'contacts.json');
if (!fs.existsSync(CONTACTS_FILE)) fs.writeFileSync(CONTACTS_FILE, '[]');

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'name, email and message are required' });
  }
  const entry = { id: Date.now(), name, email, message, date: new Date().toISOString() };
  const raw = fs.readFileSync(CONTACTS_FILE, 'utf-8');
  const arr = JSON.parse(raw || '[]');
  arr.push(entry);
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify(arr, null, 2));
  res.json({ ok: true });
});

// Catch-all to serve index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
