// pages/index/index.js
let calendar = require('../../utils/calendar/calendar.js')
const app = getApp()
let self = null
let itemArr = ['白', '夜', '休', '行', '药', '自定义']
var tempDataSet = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startTime: 1524243060000,
    ourtimes: "",
    cal1: null, // 日历渲染数据
    isShowDIY: false
  },
  /**
   * 下一个月
   */
  premonth: function(e) {
    let month = (self.data.cal1.month - 1)
    let year_diff = (month == 0) ? -1 : 0

    month = (month == 0) ? 12 : month
    // console.log("premonth",month);
    // if (self.data.cal1.year <= 2018 && month < 5) {
    //   wx.showToast({
    //     title: '往前有Bug了。',
    //   })
    //   return;
    // }
    self.getCalendarDate(self.data.cal1.year + year_diff, month)
  },
  /**
   * 获取日历
   */
  getCalendarDate(year, month, workIdx, next, isInit) {
    self.cal.monthdayscalendar({
      year: year,
      month: month,
      workIdx: workIdx,
      next: next
    }, function(resCalendar) {
      // console.log(resCalendar);
      self.setData({
        cal1: resCalendar
      })
    })

  },
  /**
   * 上一个月
   */
  nextmonth: function(e) {
    // console.log("next action...");
    let year_diff = parseInt(self.data.cal1.month / 12)
    let month = (self.data.cal1.month + 1)

    month = (self.data.cal1.month % 12) + 1
    // console.log(month);
    self.getCalendarDate(self.data.cal1.year + year_diff, month, self.data.cal1.lastDayWorkIdx, 999)

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 页面显示
    self = this
    self.cal = new calendar.Calendar();

    let that = this;
    let nowDate = new Date();
    let timess = Math.floor((Math.round(nowDate) - self.data.startTime) / 24 / 60 / 60 / 1000) + 1;
    // console.log(timess);
    this.setData({
      ourtimes: timess
    });
    self.getCalendarDate(nowDate.getFullYear(), nowDate.getMonth() + 1, true);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  refreshSelect(e) {
    // console.log(e);
    let dataSet = e.currentTarget.dataset;

    tempDataSet = dataSet;
    let tmpYear = e.detail.year;
    let tmpMonth = e.detail.month;
    tempDataSet.year = tmpYear;
    tempDataSet.month = tmpMonth;
    var tmpCal1 = this.data.cal1;

    wx.showActionSheet({
      itemList: itemArr,
      success: function(res) {

        let tapIdx = res.tapIndex;
        let index = dataSet.index;
        let idx = dataSet.idx;
        var tempValue = itemArr[tapIdx];
        if (tapIdx == 5) {
          self.setData({
            isShowDIY: true
          })
          return;
        }
        tmpCal1.calendar.weeks[index][idx][2] = itemArr[res.tapIndex];
        self.setData({
          cal1: tmpCal1
        })
        let tmpKey = tmpYear + "****" + tmpMonth;
        // console.log(tmpKey);
        wx.setStorageSync(tmpKey, tmpCal1);
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },
  confirmAction(e) {
    let tempStr = e.detail.value;
    if (tempStr.length == 0) {
      wx.showToast({
        title: '还没输入自定义类型呢',
      })
    } else {
      console.log(tempDataSet);
      let index = tempDataSet.index;
      let idx = tempDataSet.idx;

      var tmpCal1 = this.data.cal1;

      tmpCal1.calendar.weeks[index][idx][2] = tempStr;

      this.setData({
        cal1: tmpCal1,
        isShowDIY: false
      })
      let tmpKey = tempDataSet.year + "****" + tempDataSet.month;
      // console.log(tmpKey,"confirm...");
      wx.setStorageSync(tmpKey, tmpCal1);
    }
  },
  cancelAction(e) {
    this.setData({
      isShowDIY: false
    })
  }
})