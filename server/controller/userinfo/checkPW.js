const { tokenCheck } = require('../token');
const bcrypt = require('bcryptjs');

module.exports = async (req, res) => {
  const { password } = req.body;
  if(typeof password !== "string") return res.status(400).json({ error: `Password(body) must be String, input ${password}` });
  // 액세스 토큰 검증
  const check = await tokenCheck(req);
  // 검증 실패
  if(check.error) return res.status(400).json(check);
  // 패스워드 검증
  bcrypt.compare(password, check.password, async (err, result) => {
    if(!result) return res.status(400).json({ error: "Does not match" })
    res.status(200).json({
      data: req.body,
      message: "Matched"
    })
  })
}