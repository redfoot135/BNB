const db = require('../../models');

module.exports = async (req, res) => {
  const { email } = req.query;

  const find = await db.user.findOne(
    {
      where: { email }
    }
  )

  if(!find) return res.status(400).json({ error: "No matching information" })

  res.status(200).json(
    {
      data: {id: find.dataValues.idName},
      message: "id find"
    }
  )
}