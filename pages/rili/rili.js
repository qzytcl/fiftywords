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
     let worksArr = wx.getStorageSync("works");
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
  onShareAppMessage: function () {
  
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
    wx.clearStorageSync();
    let tempArr = this.data.works;
    app.globalData.works = tempArr;
    wx.setStorageSync("works", tempArr);
    wx.reLaunch({
      url: '/pages/home/home',
    })
  }
})