const mongoose = require('mongoose');


const TodoSchema = new mongoose.Schema({
id: { type: Number, required: true, unique: true },
todo: { type: String, required: true },
category: { type: String, required: true, uppercase: true },
priority: { type: String, required: true, uppercase: true },
status: { type: String, required: true, uppercase: true },
dueDate: { type: String, required: true } // store as yyyy-MM-dd string
});


module.exports = mongoose.model('Todo', TodoSchema);
