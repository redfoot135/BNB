const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { auth, diary, calender, talk, userinfo } = require('./routes');

const HTTPS_PORT = 8080;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://b-n-b.link.s3-website.ap-northeast-2.amazonaws.com"],
    credentials: true,
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
  })
);

//필요 기능 라우팅
app.use("/auth", auth);
app.use("/diary", diary);
app.use("/calender", calender);
app.use("/talk", talk);
app.use("/userinfo", userinfo);

// 테스트용 get요청
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

let server;
if(fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")){
  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log(`Port : ${HTTPS_PORT}, HTTPS server runnning`));

} else {
  server = app.listen(8080, () => console.log("port : 8080, HTTP server running"))
};

module.exports = server;