const { tokenCheck } = require('../token');

module.exports = async (req, res) => {
  // 액세스 토큰 검증
  const check = tokenCheck(req);
  // 검증 실패
  if(check.error) return res.status(400).json(check);
  
  res.json(check)
}