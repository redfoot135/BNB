const { tokenCheck } = require('../../token');
const db = require('../../../models');

module.exports = async (req, res) => {
  // 액세스 토큰 검증
  const { id, comment } = req.body;
  const check = await tokenCheck(req);
  // 검증 실패
  if(check.error) return res.status(400).json(check);

  const create = await db.diary_comment.create({
    diary_id: id,
    user_id: check.id,
    writer: check.name,
    comment: comment
  })
  create.dataValues.user = { name: check.name };

  res.status(201).json(
    {
      data: create,
      message: "Add diary comment"
    }
  )
}