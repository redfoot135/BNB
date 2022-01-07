const { tokenCheck } = require('../token');
const db = require('../../models');

module.exports = async (req, res) => {
  // 액세스 토큰 검증
  const check = await tokenCheck(req);
  // 검증 실패
  if(check.error) return res.status(400).json(check);
  // 일기 정보 받아오기(역순)
  let diaries = await db.diary.findAll({
    where: {
      writer: check.id
    },
    order: [["id", "DESC"]],
  });
  // 일기 데이터 순회
  diaries = await Promise.all(
    diaries.map(async el => {
      const result = {...el.dataValues};
      const pictures = await db.picture.findAll({
        where: {
          diary_id: el.id
        }
      })
      const diary_comment = await db.diary_comment.findAll({
        // attributes: {include: ["name"]},
        where: {
          diary_id: el.id
        },
        include: [{ 
                model: db.user,
                attributes: ["name"],
                required: false
              }]
      })
      result.pictures = pictures;
      result.diary_comment = diary_comment;
      return result;
    })
  )
  
  res.json(diaries)
}