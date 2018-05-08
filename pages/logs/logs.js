//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    text:"This is a page data...."
  },
  onLoad: function () {
    console.log('onLoad action......');
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  onUnload:function() {
    console.log('unload action......');
  },
  onHide: function() {
    console.log('hide action......');
  },
  onPullDownRefresh: function() {
    console.log('pull down refresh action......');
  },
  onReachBottom:function() {
    console.log('reach bottom action......');
  },
  onShareAppMessage:function() {
    console.log('share app message action......');
  },
  onPageScroll:function() {
    console.log('page scroll action......');
  },
  onTabItemTap:function (item) {
    console.log('tab item tap action......');
  },
  viewTap:function () {

  },
  customData:{
    hi:"MINA"
  }
})
