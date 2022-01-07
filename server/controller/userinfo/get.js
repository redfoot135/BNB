const db = require('../../models');

module.exports = async (req, res) => {
  const { id, email } = req.query;
  const query = id ? { idName: id } : email ? { email } : null;

  const user = await db.user.findOne({
    where: query
  })

  if(user) return res.status(400).json({ error: "Already exist" })

  res.status(200).json({ message: "Not exist" })
}