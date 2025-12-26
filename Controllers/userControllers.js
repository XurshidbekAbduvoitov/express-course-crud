const uuid = require("uuid");
let users = require("../Databese/userDB.js");
module.exports = {
    getHome: (req, res) => {
        res.send("<h1> Home Page </h1>");
    },
    getAllStudents: (req, res) => {
        res.send(users);
    },
    getStudentByID: (req, res) => {
        const idParam = req.params.userID
        const response = users.find(user => user.id == idParam);
        res.send(response);
    },
    deleteStudentByID: (req, res) => {
        const idParam = req.params.userID
        users = users.filter(user => user.id != idParam)
        res.send("Student deleted")
    },
    updateStudentByID: (req, res) => {
        const idParam = req.params.userID
        const { id,title, instructor,duration } = req.body;
        let user = users.find(user => user.id == idParam);
        user.id = id;
        user.title = title;
        user.instructor = instructor;
        user.duration = duration;
        res.send(user);
    },
    createStudent: (req, res) => {
        const { id, title, instructor,duration } = req.body;
        let newUser = {
            id: uuid.v4(),
            title,
            instructor,
            duration
        }
        users.unshift(newUser);
        res.send(newUser);
    }
};