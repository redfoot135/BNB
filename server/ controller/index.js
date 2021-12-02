module.exports = {
  //인증
  auth_login: require('./auth/login'),
  auth_logout: require('./auth/logout'),
  auth_social: require('./auth/social'),
  auth_autoLogin: require('./auth/autoLogin'),

  //일기
  get_diary: require('./diary/get'),
  post_diary: require('./diary/post'),
  put_diary: require('./diary/put'),
  delete_diary: require('./diary/delete'),

  //캘린더
  get_calender: require('./calender/get'),
  post_calender: require('./calender/post'),
  put_calender: require('./calender/put'),
  delete_calender: require('./calender/delete'),

  //톡
  get_talk: require('./talk/get'),
  post_talk: require('./talk/post'),
  put_talk: require('./talk/put'),
  delete_talk: require('./talk/delete'),

  //유저 정보
  post_userinfo: require('./userinfo/post'),
  put_userinfo: require('./userinfo/put'),
  delete_userinfo: require('./userinfo/delete'),
}