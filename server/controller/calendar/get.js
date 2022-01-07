const { tokenCheck } = require('../token');
const db = require('../../models');

module.exports = async(req, res) => {
  const { date } = req.query;
  const check = await tokenCheck(req);
  
  if(check.error) return res.status(400).json(check);

  const schedules = await db.schedule.findAll(
    {
      where: {date: date, user_id: check.id},
      order: [["time"]]
    }
  )

  res.status(200).json(
    {
      data: schedules,
      message: "Get schedules"
    }
  )
}