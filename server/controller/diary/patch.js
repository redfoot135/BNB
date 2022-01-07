const { tokenCheck } = require('../token');
const db = require('../../models');

module.exports = async (req, res) => {
  const { id, date, title } = req.body;
  const check = await tokenCheck(req);
  // 검증 실패
  if(check.error) return res.status(400).json(check);

  const update = await db.diary.update({
    date: date,
    title: title
  },{
    where: { id: id }
  })

  if(update[0] !== 1) return res.status(400).send("실패");

  res.status(201).json({
    data: req.body,
    message: "Edit diary"
  })
}