const { tokenCheck } = require('../../token');
const db = require('../../../models');
const { up } = require('../../../seeders/20211227091352-demo-diary');

module.exports = async (req, res) => {
  const { id, comment } = req.body;
  const check = await tokenCheck(req);
  // 검증 실패
  if(check.error) return res.status(400).json(check);

  const update = await db.diary_comment.update(
    {
      comment: comment
    },
    {
      where: {
        id: id,
        user_id: check.id
      }
    }
  )
  
  if(update[0] !== 1) return res.json(400).json({ error: "실패" })

  res.status(201).json(
    {
      data: req.body,
      message: "Edit comment"
    }
  )
}