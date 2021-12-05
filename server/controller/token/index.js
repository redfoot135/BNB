require('dotenv').config();
const { ACCESS_SECRET, REFRESH_SECRET } = process.env;
const jwt = require('jsonwebtoken');

module.exports = {
  createAccessToken: (payload) => {
    return jwt.sign(payload, ACCESS_SECRET, {expiresIn: "60m"});
  },
  createRefreshToken: (payload) => {
    return jwt.sign(payload, REFRESH_SECRET, {expiresIn: "14d"});
  },
  tokenCheck: (req) => {

  },
  autoLogin: (req, res) => {
    //쿠키에 리프레시 토큰 없으면 null리턴
    if(!req.cookies || !req.cookies.refreshToken) return null;
    //리프레시토큰 선언
    const { refreshToken } = req.cookies;
    //리프레시 토큰 검증
    jwt.verify(refreshToken, REFRESH_SECRET, (err, decoded) => {
      if(err) return null;
      const payload = {
        id: decoded.id,
        social: decoded.social,
      }
      //토큰 만들기
      const accessToken = jwt.sign(payload, ACCESS_SECRET, {expiresIn: "60m"});
      const newRefreshToken = jwt.sign(payload, REFRESH_SECRET, {expiresIn: "14d"});
      res.cookie("refreshToken", newRefreshToken);
      return {
        accessToken: accessToken,
        payload: payload,
      }
    })    
  }
}