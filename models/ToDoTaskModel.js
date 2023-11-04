const mongoose = require('mongoose');

const toDoListSchema = new mongoose.Schema({
    task_title: {
        type: String,
        unique: true,
        required: [true, "Please enter a title..."],
    },
    task_desc: {
        type: String,
        required: [true, "Please enter a task description..."],
    },
    task_status: {
        type: Boolean,
        default: false
    },
});

const ToDoList = mongoose.model('todolist', toDoListSchema);

module.exports = ToDoList;