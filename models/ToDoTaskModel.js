const mongoose = require('mongoose');

const toDoListSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      },
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