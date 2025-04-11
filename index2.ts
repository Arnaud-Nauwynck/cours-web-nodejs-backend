import express, { Request, Response } from 'express';

import fs from 'fs';
import path from 'path';

console.log('Hello Typescript....')

const app = express();
const PORT = 3000;

app.use(express.json());

// Todo interface
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// In-memory storage
let todos: Todo[] = [
  {id: 1, title:'Learn NodeJs-Express', completed:true},
  {id: 2, title:'Learn Http', completed:false},
  {id: 3, title:'Learn Typescript', completed:false},
];
let idCounter = 4;


// Serve /index.html manually
app.get('/index.html', (req, res) => {
  const filePath = path.join(__dirname, 'index.html');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading index.html:', err);
      return res.status(500).send('Internal Server Error');
    }

    res.setHeader('Content-Type', 'text/html');
    res.send(data);
  });
});


// Get all todos
app.get('/api/todo', (req: Request, res: Response) => {
  res.json(todos);
});

// Get a todo by ID
app.get('/api/todo/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  res.json(todo);
});

// Create a new todo
app.post('/api/todo', (req: Request, res: Response) => {
  const { title, completed = false } = req.body;

  if (typeof title !== 'string') {
    return res.status(400).json({ message: 'Invalid title' });
  }

  const newTodo: Todo = {
    id: idCounter++,
    title,
    completed,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update a todo
app.put('/api/todo/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  const { title, completed } = req.body;

  if (typeof title === 'string') {
    todo.title = title;
  }

  if (typeof completed === 'boolean') {
    todo.completed = completed;
  }

  res.json(todo);
});

// Delete a todo
app.delete('/api/todo/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  todos.splice(index, 1);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
