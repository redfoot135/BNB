const { tokenCheck } = require('../token');
const db = require('../../models');

module.exports = async (req, res) => {
  const { id, time, text } = req.body;
  console.log(req.body)
  const check = await tokenCheck(req);
  // 검증 실패
  if(check.error) return res.status(400).json(check);

  console.log({time, text})

  const update = await db.schedule.update({time, text},
    {
      where: { id: id, user_id: check.id },
    }
  )
  
  console.log(update)

  res.status(201).json(
    {
      data: req.body,
      message: "Change Schedule" 
    }
  )
}