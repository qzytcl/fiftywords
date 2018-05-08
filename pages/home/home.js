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
  getCalendarDate(year, month, isInit) {
    self.cal.monthdayscalendar({
      year: year,
      month: month
    }, function (resCalendar) {

      self.setData({ cal1: resCalendar })
    })
  },
  /**
  * 上一个月
  */
  nextmonth: function (e) {
    let year_diff = parseInt(self.data.cal1.month / 12)
    let month = (self.data.cal1.month + 1)

    month = (self.data.cal1.month % 12) + 1
    self.getCalendarDate(self.data.cal1.year + year_diff, month)
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
})