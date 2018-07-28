// pages/rili/rili.js
// const mainjs = require('../../utils/main.js');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    works: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let worksArr = app.globalData.works;
     if(worksArr) {
       this.setData({
         works: worksArr
       })
     }else{
       this.setData({
         works:app.globalData.works
       })
     }
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
    }
    return {
      title: '分享小铖铖的排班表',
      path: '/page/rili/rili',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  dayaction(e){
    let targetId = e.currentTarget.id;
    let that = this;
    wx.showActionSheet({
      itemList: ['白', '夜', '休'],
      success: function (res) {
        let value = ['白', '夜', '休'][res.tapIndex];
        that.data.works[targetId] = value;
        let tempArr = that.data.works;
        that.setData({
          works: tempArr
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  saveAction(e){
    console.log("save action start.....");
    wx.clearStorageSync();
    let tempArr = this.data.works;
    console.log(tempArr);
    app.globalData.works = tempArr;
    wx.setStorageSync("works", tempArr);
    wx.reLaunch({
      url: '/pages/home/home',
    })
    console.log("save action end ...")
  }
})