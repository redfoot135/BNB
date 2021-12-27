const db = require('../../models');
const bcrypt = require('bcryptjs');
const { createAccessToken, createRefreshToken } = require('../token');

module.exports = async (req, res) => {
  console.log(req.body)
  //받아온 아이디 패스워드
  const { id, password } = req.body;
  //잘못된 정보일 때
  if( typeof id !== "string" || typeof password !== "string") {
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
  //받아온 정보로 아이디 조회
  const info = await db.user.findOne({
    where: { idName: id }
  })
  //일치하는 유저 없을 경우
  if(!info) return res.status(400).json({ error: "ID or password is incorrect." });
  const userinfo = info.dataValues;
  //일치할 경우 패스워드 조회
  bcrypt.compare(password, userinfo.password, (err, result) => {
    //일치하지 않으면
  if(!result) return res.status(400).json({ error: "ID or password is incorrect." });
    //일치하면
    const payload = {
      id: userinfo.idName,
      social: userinfo.social,
    }
    // 토큰 만들기
    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);
    //리프레시 토큰 쿠키로 보내기
    res.cookie("refreshToken", refreshToken, {
      httpOnly: false,
      secure: true,
      sameSite: "none"
     });
    //로그인 성공 응답
    res.status(200).json({
      data: {
        accessToken: accessToken,
        id: userinfo.idName,
        name: userinfo.name,
        email: userinfo.email,
        social: userinfo.social,
        gender: userinfo.gender,
        spouse: userinfo.spouse
      },
      message: "Information passed"
    })
  })
}