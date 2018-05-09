let calendar = require('../../utils/calendar/calendar.js')
const app = getApp()
let self = null
Page({
  data: {
    cal1: null // 日历渲染数据
  },
  /**
* 下一个月
*/
  premonth: function (e) {
    let month = (self.data.cal1.month - 1)
    let year_diff = (month == 0) ? -1 : 0

    month = (month == 0) ? 12 : month
    self.getCalendarDate(self.data.cal1.year + year_diff, month)
  },
  /**
* 获取日历
*/
  getCalendarDate(year, month,workIdx,next, isInit) {
    self.cal.monthdayscalendar({
      year: year,
      month: month,
      workIdx: workIdx,
      next: next
    }, function (resCalendar) {

      self.setData({ cal1: resCalendar })
    })
  },
  /**
  * 上一个月
  */
  nextmonth: function (e) {
    // console.log("next action...");
    let year_diff = parseInt(self.data.cal1.month / 12)
    let month = (self.data.cal1.month + 1)

    month = (self.data.cal1.month % 12) + 1
    self.getCalendarDate(self.data.cal1.year + year_diff, month, self.data.cal1.lastDayWorkIdx,999)
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    self = this
    self.cal = new calendar.Calendar();
    let nowDate = new Date();
    self.getCalendarDate(nowDate.getFullYear(), nowDate.getMonth() + 1, true);
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  handleSelecteDate(e) {

    wx.showToast({ title: `${e.detail.date}`, icon: false })
  },
  refreshSelect(e) {

    let dataSet = e.currentTarget.dataset;
    var tmpCal1 = this.data.cal1;
    console.log(tmpCal1.realYear,dataSet.year);
    if (tmpCal1.realYear == dataSet.year && tmpCal1.realMonth == dataSet.month) {
      wx.showActionSheet({
        itemList: ['白', '夜', '休', '白备', '夜备'],
        success: function (res) {
          let index = dataSet.index;
          let idx = dataSet.idx;
          tmpCal1.calendar.weeks[index][idx][2] = ['白', '夜', '休', '白备', '夜备'][res.tapIndex];
          self.setData({ cal1: tmpCal1 })
          let tmpKey = dataSet.year + "****" + dataSet.month;
          wx.setStorageSync(tmpKey, tmpCal1);
        },
        fail: function (res) {
          console.log(res.errMsg)
        }
      })
    }
    

    
  }
})