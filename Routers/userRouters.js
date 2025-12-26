const router = require("express").Router();
const us = require("../Routers/userRouters");
const userControllers = require("../Controllers/userControllers");


router.get("/", userControllers.getHome);
router.get("/users/all", userControllers.getAllStudents);
router.get("/users/one/:userID", userControllers.getStudentByID);
router.delete("/users/one/:userID", userControllers.deleteStudentByID);
router.put("/users/:userID", userControllers.updateStudentByID);
router.post("/users/one", userControllers.createStudent);
module.exports = router;

