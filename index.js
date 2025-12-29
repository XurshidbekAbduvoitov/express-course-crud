const express = require("express");
const uuid = require("uuid");
const app = express();


app.use(express.json());

// 1. "Database" (Vaqtinchalik xotira)
let users = [
  {
    id: "1",
    title: "JavaScript Basics",
    instructor: "Azimjon",
    duration: 30
  }
];


// Home Page
app.get("/", (req, res) => {
  res.send("<h1> Home Page </h1>");
});

// Barcha talabalarni olish
app.get("/api/users/all", (req, res) => {
  res.status(200).json(users);
});

// ID orqali bitta talabani olish
app.get("/api/users/one/:userID", (req, res) => {
  const idParam = req.params.userID;
  const student = users.find(u => u.id === idParam);
  
  if (!student) {
    return res.status(404).json({ message: "Talaba topilmadi" });
  }
  res.json(student);
});

// Yangi talaba qo'shish
app.post("/api/users/one", (req, res) => {
  const { title, instructor, duration } = req.body;
  
  if (!title || !instructor) {
    return res.status(400).json({ message: "Ma'lumotlar to'liq emas" });
  }

  const newUser = {
    id: uuid.v4(),
    title,
    instructor,
    duration
  };

  users.unshift(newUser);
  res.status(201).json(newUser);
});

// Talaba ma'lumotini yangilash
app.put("/api/users/:userID", (req, res) => {
  const idParam = req.params.userID;
  const { title, instructor, duration } = req.body;
  
  const student = users.find(u => u.id === idParam);

  if (student) {
    student.title = title || student.title;
    student.instructor = instructor || student.instructor;
    student.duration = duration || student.duration;
    res.json(student);
  } else {
    res.status(404).json({ message: "Yangilash uchun talaba topilmadi" });
  }
});

// Talabani o'chirish
app.delete("/api/users/one/:userID", (req, res) => {
  const idParam = req.params.userID;
  const initialLength = users.length;
  
  users = users.filter(u => u.id !== idParam);

  if (users.length < initialLength) {
    res.json({ message: "Student deleted" });
  } else {
    res.status(404).json({ message: "O'chirish uchun talaba topilmadi" });
  }
});

// Serverni ishga tushirish
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on: ${PORT}`);
});