const express = require("express");
const app = express();
const cors = require("cors");

const db = require("./db");

const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/student-login", (req, res) => {
  var found = -1;
  let u = req.body.student_no;
  let p = req.body.password;
  let all_student = db.student;
  for (let i = 0; i < all_student.length; i++) {
    if (all_student[i].student_no == u && all_student[i].password == p) {
      found = i;
    }
  }

  if (found != -1) {
    let student = Object.assign({}, all_student[found]);
    delete student.password;
    res.status(200).json({
      result: true,
      status: 200,
      message: "Login success!",
      data: student,
    });
  } else {
    res.status(400).json({
      result: false,
      status: 400,
      message: "Student ID or password incorrect",
    });
  }
});

app.post("/api/teacher-login", (req, res) => {
  var found = -1;
  let u = req.body.teacher_no;
  let p = req.body.password;
  let all_teacher = db.teacher;
  for (let i = 0; i < all_teacher.length; i++) {
    if (all_teacher[i].teacher_no == u && all_teacher[i].password == p) {
      found = i;
    }
  }

  if (found != -1) {
    let teacher = Object.assign({}, all_teacher[found]);
    delete teacher.password;
    res.status(200).json({
      result: true,
      status: 200,
      message: "Login success!",
      data: teacher,
    });
  } else {
    res.status(400).json({
      result: false,
      status: 400,
      message: "Teacher ID or password incorrect",
    });
  }
});

app.get("/api/rule", (req, res) => {
  res.status(200).json({
    result: true,
    status: 200,
    message: "Success",
    data: [
      { id: "_c1bca3", type: "decrease", text: "ไม่ตัดผม", score: 10 },
      { id: "_a3acb2", type: "decrease", text: "แต่งตัวผิดระเบียบ", score: 10 },
      { id: "_baabcc", type: "increase", text: "เข้าร่วมกิจกรรม", score: 2 },
      { id: "_a4fabe", type: "increase", text: "ช่วยงานจิตอาสา", score: 5 },
    ],
  });
});

app.get("/api/student-score-data/:id", (req, res) => {
  var id = req.params.id;

  data = db.score[id];

  if (data == undefined) {
    res.status(400).json({
      result: false,
      status: 400,
      message: "Not found user",
      data: data,
    });
  } else {
    res.status(200).json({
      result: true,
      status: 200,
      message: "Success",
      data: data,
    });
  }
});

app.listen(9000, () => {
  console.log("API run on port 9000");
});
