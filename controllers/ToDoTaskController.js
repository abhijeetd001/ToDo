const ToDoList = require("../models/ToDoTaskModel");

// controller actions
module.exports.toDoTaskGet = async (req, res) => {
    try {
        const todoList = await ToDoList.find({});
        res.status(200).json(todoList);
    } catch (error) {
        res.status(500).json({ message: error.message }) 
    }
}

module.exports.createToDoTask = async (req, res) => {
    const { task_title, task_desc, task_status } = req.body;
    try {
        const data = await ToDoList.create({ task_title, task_desc, task_status });
        res.status(201).json(data);
    }
    catch (err) {
        console.log("catch err ===>>>>>>>>>", err);
        res.status(400).json({ err });
    }
}

module.exports.updateTodoTask = async (req, res) => {
    try {
        const { id } = req.params;
        const todoItem = await ToDoList.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if (!todoItem) {
            return res.status(404).json({ message: `cannot find any task with ID ${id}` })
        }
        const updatedToDoList = await ToDoList.findById(id);
        res.status(200).json(updatedToDoList);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.deleteToDoTask = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await ToDoList.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: `cannot find any User with ID ${id}` })
        }
        res.status(200).send("Item has been deleted...");

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}





