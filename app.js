//app.js
App({
  globalData: 1,
  onLaunch: function () {
    // 展示本地存储能力
    var works = wx.getStorageSync("works") || [{ content: '白', date: 4 }, { content: '夜', date: 1 }, { content: '休', date: 2 }, { content: '休', date: 3 }]
    this.globalData.works = works;
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     // console.log(res);
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    works: []
  }
})