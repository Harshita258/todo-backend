const Todo = require('../models/Todo');
const upStatus = status ? String(status).toUpperCase() : undefined;
const upPriority = priority ? String(priority).toUpperCase() : undefined;
const upCategory = category ? String(category).toUpperCase() : undefined;
const formattedDate = toYMD(dueDate);


// Validate
if (upStatus === undefined || upPriority === undefined || upCategory === undefined || !todo || !formattedDate) {
if (upStatus !== undefined && !allowedStatus.includes(upStatus)) return res.status(400).send('Invalid Todo Status');
if (upPriority !== undefined && !allowedPriority.includes(upPriority)) return res.status(400).send('Invalid Todo Priority');
if (upCategory !== undefined && !allowedCategory.includes(upCategory)) return res.status(400).send('Invalid Todo Category');
if (!formattedDate) return res.status(400).send('Invalid Due Date');
return res.status(400).send('Bad Request');
}


// Ensure uniqueness of id. If not provided, generate one using timestamp (number)
let newId = Number(id) || Date.now();
// If id collides, try incrementing until unique (small loop)
while (await Todo.exists({ id: newId })) newId += 1;


const doc = new Todo({ id: newId, todo, priority: upPriority, status: upStatus, category: upCategory, dueDate: formattedDate });
await doc.save();
res.send('Todo Successfully Added');
} catch (err) {
console.error(err);
res.status(500).send('Server Error');
}
};


// Update
exports.updateTodo = async (req, res) => {
try {
const todoId = Number(req.params.todoId);
const payload = req.body;
const updates = {};


if (payload.status !== undefined) {
const up = String(payload.status).toUpperCase();
if (!allowedStatus.includes(up)) return res.status(400).send('Invalid Todo Status');
updates.status = up;
await Todo.updateOne({ id: todoId }, { $set: updates });
return res.send('Status Updated');
}


if (payload.priority !== undefined) {
const up = String(payload.priority).toUpperCase();
if (!allowedPriority.includes(up)) return res.status(400).send('Invalid Todo Priority');
updates.priority = up;
await Todo.updateOne({ id: todoId }, { $set: updates });
return res.send('Priority Updated');
}


if (payload.todo !== undefined) {
updates.todo = payload.todo;
await Todo.updateOne({ id: todoId }, { $set: updates });
return res.send('Todo Updated');
}


if (payload.category !== undefined) {
const up = String(payload.category).toUpperCase();
if (!allowedCategory.includes(up)) return res.status(400).send('Invalid Todo Category');
updates.category = up;
await Todo.updateOne({ id: todoId }, { $set: updates });
return res.send('Category Updated');
}


if (payload.dueDate !== undefined) {
const formatted = toYMD(payload.dueDate);
if (!formatted) return res.status(400).send('Invalid Due Date');
updates.dueDate = formatted;
await Todo.updateOne({ id: todoId }, { $set: updates });
return res.send('Due Date Updated');
}


// If nothing matched
return res.status(400).send('Bad Request');
} catch (err) {
console.error(err);
res.status(500).send('Server Error');
}
};


// Delete
exports.deleteTodo = async (req, res) => {
try {
