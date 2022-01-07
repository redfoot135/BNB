const { tokenCheck } = require('../token');
const db = require('../../models');
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  const { baby, birthday, gender, name } = req.body;
  console.log(req.body)
  const check = await tokenCheck(req);
  // 검증 실패
  if(check.error) return res.status(400).json(check);

  const [data, create] = await db.baby.findOrCreate(
    {
      defaults: {
        baby: baby,
        mom: (check.gender || gender) === "female" ? check.id : null,
        dad: (check.gender || gender) === "male" ? check.id : null,
        birthday: new Date(birthday)
      },
      where: {
        baby: baby,
        [Op.or]: [{ mom: check.id }, { dad: check.id }]
      }
    }
  )

  const update = await db.user.update(
    {
      gender: gender,
      name: name
    },
    {
      where: { id: check.id }
    }
  )

  if(!create) return res.status(400).json({ error: "Already exists" })

  res.status(201).json(
    {
      data: req.body,
      message: "It is registered"
    }
  )
}