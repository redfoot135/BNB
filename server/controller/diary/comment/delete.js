const { tokenCheck } = require('../../token');
const db = require('../../../models');

module.exports = async (req, res) => {
  const { id } = req.query;
  const check = await tokenCheck(req);
  // 검증 실패
  if(check.error) return res.status(400).json(check);

  const destroy = await db.diary_comment.destroy(
    {
      where : { id: id, user_id: check.id }
    }
  )

  if(destroy === 0) return res.status(400).json({ error: "It has already been deleted" })
  
  res.send({ message: "Delete comment" })
}