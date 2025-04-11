"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
console.log('Hello Typescript....');
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
// In-memory storage
let todos = [
    { id: 1, title: 'Learn NodeJs-Express', completed: true },
    { id: 2, title: 'Learn Http', completed: false },
    { id: 3, title: 'Learn Typescript', completed: false },
];
let idCounter = 4;
// Serve /index.html manually
app.get('/index.html', (req, res) => {
    const filePath = path_1.default.join(__dirname, 'index.html');
    fs_1.default.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading index.html:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.setHeader('Content-Type', 'text/html');
        res.send(data);
    });
});
// Get all todos
app.get('/api/todo', (req, res) => {
    res.json(todos);
});
// Get a todo by ID
app.get('/api/todo/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    if (!todo) {
        res.status(404).json({ message: 'Todo not found' });
        return;
    }
    res.json(todo);
});
// Create a new todo
app.post('/api/todo', (req, res) => {
    const { title, completed = false } = req.body;
    if (typeof title !== 'string') {
        res.status(400).json({ message: 'Invalid title' });
        return;
    }
    const newTodo = {
        id: idCounter++,
        title,
        completed,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});
// Update a todo
app.put('/api/todo/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    if (!todo) {
        res.status(404).json({ message: 'Todo not found' });
        return;
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
app.delete('/api/todo/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) {
        res.status(404).json({ message: 'Todo not found' });
        return;
    }
    todos.splice(index, 1);
    res.status(204).send();
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
//# sourceMappingURL=index2.js.map