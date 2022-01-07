module.exports = {
  //인증
  auth_login: require('./auth/login'),
  auth_logout: require('./auth/logout'),
  auth_social: require('./auth/social'),
  auth_autoLogin: require('./auth/autoLogin'),

  //일기
  get_diary: require('./diary/get'),
  post_diary: require('./diary/post'),
  patch_diary: require('./diary/patch'),
  delete_diary: require('./diary/delete'),
  // 일기 코멘트
  diaryComment: {
    delete_comment: require('./diary/comment/delete'),
    patch_comment: require('./diary/comment/patch'),
    post_comment: require('./diary/comment/post'),
  },


  //캘린더
  get_calendar: require('./calendar/get'),
  post_calendar: require('./calendar/post'),
  patch_calendar: require('./calendar/patch'),
  delete_calendar: require('./calendar/delete'),

  //톡
  get_talk: require('./talk/get'),
  post_talk: require('./talk/post'),
  put_talk: require('./talk/put'),
  delete_talk: require('./talk/delete'),
  // 톡 코멘트
  talkComment: {
    delete_comment: require('./talk/comment/delete'),
    patch_comment: require('./talk/comment/patch'),
    post_comment: require('./talk/comment/post'),
  },


  //유저 정보
  get_id: require('./userinfo/id'),
  get_pw: require('./userinfo/pw'),
  get_userinfo: require('./userinfo/get'),
  post_userinfo: require('./userinfo/post'),
  put_userinfo: require('./userinfo/put'),
  patch_userinfo: require('./userinfo/patch'),
  delete_userinfo: require('./userinfo/delete'),
  post_connect: require('./userinfo/connect'),
  post_checkPW: require('./userinfo/checkPW'),
  post_baby: require('./userinfo/baby'),
}