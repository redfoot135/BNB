const { autoLogin } = require('../token');
const db = require('../../models');

module.exports = async (req, res) => {
  console.log(req.cookies)
  //토큰 인증
  const check = autoLogin(req, res);
  //토큰 문제 또는 유효하지 않으면
  if(!check) return res.send("토큰 없음")
  //토큰 유효하면
  res.status(200).json(check);
}