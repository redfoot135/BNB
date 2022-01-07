const db = require('../../models');
const { SALTROUNDS, AUTHUSER, AUTHPASS, FROMEMAIL } = process.env;
const bcrypt = require('bcryptjs');
const { v4 } = require('uuid');
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  const { id, email } = req.query;
  const saltRounds = Number(SALTROUNDS);

  const find = await db.user.findOne(
    {
      where: { idName: id, email: email }
    }
  )

  if(!find) return res.status(400).json({ error: "No matching information" })

  const newPW = v4().slice(0,8);

  bcrypt.hash(newPW, saltRounds, async (err, hash) => {
    await db.user.update(
      {
        password: hash
      },
      {
        where: find.dataValues
      }
    )
  })

  //메일 발송 실패시 사용할 카운트
  let errorCount = 0;
  //인증 메일 발송 함수
  function sendEmail(toEmail) {
    //5번 전송 실패하면  
    if(errorCount === 5) {
      //저장된 데이터 복구
      db.user.update(
        {
          password: find.dataValues.password
        },
        {
          where: find.dataValues
        }
      );
    }else {
      const transporter = nodemailer.createTransport({
        host: "smtp.naver.com",
        secure: true,
        auth: {
          user: AUTHUSER,
          pass: AUTHPASS
        }
      });


      let mailOptions = {
        from: FROMEMAIL,
        to: toEmail,
        subject: 'B-N-B 임시 비밀번호 전송합니다.',
        html: `<div>
          <h1>B-N-B 임시 비밀번호 전송</h1>
          <div>임시 비밀번호는 "${newPW}" 입니다.</div>
          <div>바로 로그인해서 비밀번호를 변경해주세요.</div>
          <a href='http://localhost:3000/login'>B-N-B 이용하기</a>
        </div>`
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            // 에러
            // 전송 실패시 재귀로 5번까지 다시 보내기
            errorCount++;
            sendEmail(toEmail);
        }
        //전송 완료
        transporter.close()
    })}
  }
  //메일 발송
  sendEmail(email);

  if(errorCount === 5) return res.status(400).json({ error: "Email sending failed" });

  res.status(200).json({ message: "Email sending success" })
}