const { Router } = require('express');
const jwt = require('jsonwebtoken');
const toDoTaskController = require('../controllers/ToDoTaskController');

const router = Router();

router.get('/todolist', verifyToken, toDoTaskController.toDoTaskGet);
router.post('/createtask', verifyToken, toDoTaskController.createToDoTask);
router.put('/todotask/:id', verifyToken, toDoTaskController.updateTodoTask);
// router.put('/todotaskstatus/:id', toDoTaskController.updateTodoTask);
router.delete('/todotask/:id', verifyToken, toDoTaskController.deleteToDoTask);

function verifyToken(req, resp, next) {
    let token = req.headers['authtoken'];
    if (token) {
        token = token.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, valid) => {
            if (err) {
                resp.status(401).send({
                    result: "Please provide valid token"
                })
            } else {
                next();
            }
        })
    } else {
        resp.status(403).send({ result: "Please add token with header" })
    }
}

module.exports = router; 