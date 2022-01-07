const { tokenCheck } = require('../token');
const db = require('../../models');

module.exports = async (req, res) => {
  // 액세스 토큰 검증
  const { title, comment, url, date } = req.body;
  const check = await tokenCheck(req);
  // 검증 실패
  if(check.error) return res.status(400).json(check);

  //일기 만들기
  const createDiary = await db.diary.create({
    title: title,
    date: date,
    writer: check.id
  })

  await db.diary_comment.create({
    diary_id: createDiary.dataValues.id,
    user_id: check.id,
    writer: check.name,
    comment: comment
  })

  await db.picture.create({
    diary_id: createDiary.dataValues.id,
    url: url
  })

  res.status(201).json(
    {
      data: req.body,
      message: "Add diary"
    }
  )
}