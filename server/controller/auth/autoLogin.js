const { autoLogin } = require('../token');
const db = require('../../models');

module.exports = async (req, res) => {
  //토큰 인증
  const check = autoLogin(req);
  //토큰 문제 또는 유효하지 않으면
  if(!check) return res.send("토큰 없음")
  //토큰 유효하면
  const userinfo = await db.user.findOne({
    where: check.payload,
  })

  res.send("AutoLogin")
}