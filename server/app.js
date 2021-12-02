const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const HTTPS_PORT = 443;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
);

//인증 관련(로그인, 로그아웃, 소셜, 자동로그인)
const auth = require('./routes/auth');
app.use("/auth", auth);

// 일기/get-post-put-delete
const diary = require('./routes/diary');
app.use("/diary", diary);

// 캘린더/get-post-put-delete
const calender = require('./routes/calender');
app.use("/calender", calender);

// 톡/get-post-put-delete
const talk = require('./routes/talk');
app.use("/talk", talk);

// 유저 정보/post회원가입-put정보수정-delete회원탈퇴
const userinfo = require('./routes/userinfo');
app.use("/userinfo", userinfo);

// 테스트용 get요청
app.get("/", (req, res) => {
  res.send("Hello World!!")
});

let server;
if(fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")){
  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log(`Port : ${HTTPS_PORT}, HTTPS server runnning`));

} else {
  server = app.listen(8000, () => console.log("port : 8000, HTTP server running"))
};

module.exports = server;