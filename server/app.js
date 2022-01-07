const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { auth, diary, calendar, talk, userinfo } = require('./routes');

const HTTPS_PORT = 80;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://b-n-b.link.s3-website.ap-northeast-2.amazonaws.com", "https://b-n-b.link"],
    credentials: true,
    origin: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
  })
);

//필요 기능 라우팅
// app.use("/auth", auth);
// app.use("/diary", diary);
// app.use("/calendar", calendar);
// app.use("/talk", talk);
// app.use("/userinfo", userinfo);

// 테스트용 get, post요청
app.get("/", (req, res) => {
  console.log(req)
  console.log(req.body)
  res.send("Hello BNB World!!")
});

app.post("/", (req, res) => {
  console.log(req)
  console.log(req.body)
  res.send("Hello BNB World!!")
});

server = app.listen(80, () => console.log("port : 80, HTTP server running"))

module.exports = server;