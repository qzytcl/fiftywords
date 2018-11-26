//app.js
App({
  globalData: 1,
  onLaunch: function () {
    // 展示本地存储能力
    var works = wx.getStorageSync("works") || ["白", "夜", "休", "休"]
    this.globalData.works = works;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res);
      }
    })
  },
  globalData: {
    userInfo: null,
    works: []
  }
})