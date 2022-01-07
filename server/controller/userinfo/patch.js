const { tokenCheck } = require('../token');
const db = require('../../models');
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  console.log(req.body)
  // 액세스 토큰 검증
  const check = await tokenCheck(req);
  // 검증 실패
  if(check.error) return res.status(400).json(check);
  // 정보 수정하기
  // 보내온 바디 정보
  const query = req.body;
  if(query.birthday) query.birthday = new Date(query.birthday);
  if(Object.keys(query).length !== 1) return res.status(400).json({ error: "하나의 파라미터만 가능" });
  if(!query.name && !query.baby && !query.birthday) return res.status(400).json({ error: "잘못된 파라미터" });
  // 유저 네임 변경이면 유저 테이블, 아니면 바디 테이블
  const table = query.name ? db.user : db.baby;
  const where = query.name ? {where: { id: check.id }} : {where: {[Op.or]: [{ mom: check.id }, { dad: check.id }]}};
  const change = await table.update(query, where)
  console.log(change)
  res.send("Userinfo Patch")
}