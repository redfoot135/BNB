require("dotenv").config();
const { SALTROUNDS } = process.env;
const bcrypt = require('bcryptjs');
const db = require('../../models');

module.exports = async (req, res) => {
  //받아온 정보
  const { id, email, password, name, gender } = req.body;
  const saltRounds = Number(SALTROUNDS);

  //정보가 잘못되면
  if( typeof id !== "string" || typeof email !== "string" || typeof password !== "string" || typeof name !== "string"  || !(gender === "male" || gender === "female")) {
    //잘못 보내온 키와 값 배열로 만들기
    const keys = [];
    const values = [];
    for(let i in req.body) {
      if(typeof req.body[i] !== "string") {
        keys.push(i);
        values.push(`${i}: ${req.body[i]}`);
      }
    }
    //잘못온 값을 보내줌
    return res.status(400).json({ error: `${keys.join(', ')}(body) must be String, input ${values.join(', ')}` });
  }
  //정보가 제대로 왔으면 패스워드 암호화
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    //에러 //에러가 나는 경우가 있나??
    if(err) return res.status(422).json({ error: "insufficient parameters supplied" });
    //암호화(해시)성공
    //아이디 조회 후 없으면 아이디 만들기
    const [data, created] = await db.user.findOrCreate({
      where: { idName: id },
      defaults: {
        idName: id,
        name: name,
        password: hash,
        email: email,
        social: null,
        gender: gender,
        spouse: null
      }
    })
    //이미 아이디가 있으면
    if(!created) return res.status(400).json({ error: "This email already exists" })
    // //성공했으면
    res.status(201).json({
      data: req.body,
      message: "You have become an associate member."
    })
  })
}