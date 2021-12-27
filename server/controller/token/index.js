require('dotenv').config();
const { ACCESS_SECRET, REFRESH_SECRET } = process.env;
const db = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = {
  createAccessToken: (payload) => {
    return jwt.sign(payload, ACCESS_SECRET, {expiresIn: "60m"});
  },
  createRefreshToken: (payload) => {
    return jwt.sign(payload, REFRESH_SECRET, {expiresIn: "14d"});
  },

  // 액세스 토큰 검증
  tokenCheck: async (req) => {
    let result = {};
    // 인증 정보
    const { authorization } = req.headers;
    // 인증 정보 없을 때
    if(authorization === undefined) return {error: "Not authorization"};

    // 토큰 걸러내기
    const [bearer, token] = authorization.split(' ');
    // Bearer 없거나 뒤에 토큰이 없을 때
    if(bearer !== "Bearer" || token === undefined) return {error: "Not authorization"};

    // 엑세스 토큰 검증하기
    jwt.verify(token, ACCESS_SECRET, (err, decoded) => {
      // 인증 성공
      if(decoded) result = decoded;
      // 인증 실패
      else result = {error: "Token has expired"};
    })
    // 인증 실패 에러 메시지
    if(result.error) return result;

    // 유저 정보 확인
    const userinfo = await db.user.findOne({
      where: {
        idName: result.id,
        social: result.social
      }
    })
    return {
      id: userinfo.dataValues.id,
      name: userinfo.dataValues.name,
    };
  },

  // 자동 로그인
  autoLogin: (req, res) => {
    //쿠키에 리프레시 토큰 없으면 null리턴
    if(!req.cookies || !req.cookies.refreshToken) return null;
    //리프레시토큰 선언
    const { refreshToken } = req.cookies;
    //리프레시 토큰 검증
    jwt.verify(refreshToken, REFRESH_SECRET, async (err, decoded) => {
      if(err) return null;
      const payload = {
        id: decoded.id,
        social: decoded.social,
      }
      //토큰 만들기
      const accessToken = jwt.sign(payload, ACCESS_SECRET, {expiresIn: "60m"});
      // const newRefreshToken = jwt.sign(payload, REFRESH_SECRET, {expiresIn: "14d"});
      // res.cookie("refreshToken", newRefreshToken, {
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: "none"
      //  });

      const info = await db.user.findOne({
        where: check.payload,
      })
      const userinfo = info.dataValues;

      return {
        data: {
          accessToken: accessToken,
          id: userinfo.idName,
          name: userinfo.name,
          email: userinfo.email,
          social: userinfo.social,
          gender: userinfo.gender,
          spouse: userinfo.spouse
        },
        messgae: "Ok"
      }
    })    
  }
}