const { tokenCheck } = require('../token');
const db = require('../../models');

module.exports = async (req, res) => {
  const { date, time, text } = req.body;
  const check = await tokenCheck(req);
  // 검증 실패
  if(check.error) return res.status(400).json(check);

  // 일정 등록
  const schedule = await db.schedule.create({
    date: date,
    time: time,
    user_id: check.id,
    text: text,
  })

  const data = {...req.body};
  data.id = schedule.id;

  res.status(201).json(
    {
      data: data,
      message: "Add schedule"
    }
  )
}