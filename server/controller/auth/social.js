require('dotenv').config();
const { KAKAO_API_KEY, KAKAO_CLIENT_SECRET } = process.env;
const qs = require('qs');
const { default: axios } = require("axios");
const db = require('../../models');
const { createAccessToken, createRefreshToken } = require('../token');

module.exports = (req, res) => {
  const { kakao, google } = req.body;
  //카카오 토큰을 보내오면
  if( kakao ) {
    //보내줄 데이터
    const kakaoData = qs.stringify({
      'grant_type': 'authorization_code',
      'client_id': `${KAKAO_API_KEY}`,
      'redirect_uri': 'http://localhost:3000/Kakao',
      'code': kakao,
      'client_secret': `${KAKAO_CLIENT_SECRET}`
    });
    //요청 보낼 정보
    const config = {
      method: 'post',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : kakaoData
    }
    //카카오에 엑세스 토큰 요청
    axios(config)
    .then(tokenData => {
      //받아온 토큰 데이터
      const kakaoToken = tokenData.data.access_token;
      //카카오에서 유저 정보 받아오기
      axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${kakaoToken}`
        }
      })
      .then(async (kakaoUserData) => {
        //받아온 유저 아이디 정보
        const socialId = kakaoUserData.data.id;
        const payload = {
          id: null,
          social: socialId,
        }
        //유저 정보가 없으면 만들기
        const [data, created] = await db.user.findOrCreate({
          where: { social: socialId},
          defaults: {
            idName: null,
            name: null,
            password: null,
            email: null,
            social: socialId,
            gender: null,
            spouse: null
          }
        })
        //만들었거나 받아온 유저 정보(패스워드 제외)
        const { idName, name, email, social, gender, spouse } = data.dataValues;
        const accessToken = createAccessToken(payload);
        return res.status(200).json({
          data: {
            accessToken: accessToken,
            id: idName,
            name: name,
            email: email,
            social: social,
            gender: gender,
            spouse: spouse
          },
          message: "Information passed"
        })
      })
      //2번 axios요청 실패시
      .catch(err => res.status(400).json({ error: "This token information is incorrect" }))
    })
    //1번 axios요청 실패시
    .catch(err => res.status(400).json({ error: "This token information is incorrect" }))
  }
}