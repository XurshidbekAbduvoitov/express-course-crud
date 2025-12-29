const express = require("express");
const app = express();
app.use(express.json());

let courses = [];
let nextId = 1;

// POST /courses
app.post("/courses", (req, res) => {
  const { title, instructor, duration } = req.body;
  if (!title || !instructor || !duration) {
    return res.status(400).json({ message: "Ma'lumotlar to'liq emas" });
  }
  const newCourse = { id: nextId++, title, instructor, duration };
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

// GET /courses
app.get("/courses", (req, res) => {
  res.json(courses);
});

// GET /courses/:id
app.get("/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).json({ message: "Course topilmadi" });
  res.json(course);
});

// PUT /courses/:id
app.put("/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).json({ message: "Course topilmadi" });

  const { title, instructor, duration } = req.body;
  course.title = title || course.title;
  course.instructor = instructor || course.instructor;
  course.duration = duration || course.duration;

  res.json(course);
});

// DELETE /courses/:id
app.delete("/courses/:id", (req, res) => {
  const initialLength = courses.length;
  courses = courses.filter(c => c.id !== parseInt(req.params.id));
  if (courses.length < initialLength) {
    res.json({ message: "Course o'chirildi" });
  } else {
    res.status(404).json({ message: "Course topilmadi" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
