// pages/rili/rili.js
// const mainjs = require('../../utils/main.js');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    worksData: [{ content: '白', date: 4 }, { content: '夜', date: 1 }, { content: '休', date: 2 },{ content: '休', date: 3 }],
    allCount:4,
    isShowDIY: false,
    currentIdx:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let worksArr = app.globalData.works;

    if (worksArr) {
      this.setData({
        worksData: worksArr,
        allCount: worksArr.length
      })
    }
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
    let targetId = e.currentTarget.dataset.id;
    this.setData({
      currentIdx:targetId
    })
    let that = this;
    let arr = ['白', '夜', '休','自定义']
    wx.showActionSheet({
      itemList: arr,
      success: function (res) {
        let tapIdx = res.tapIndex;
        let value = arr[tapIdx];
        var tempArr = that.data.worksData;

        tempArr[targetId].content = value;
        if (tapIdx == 3) {
          that.setData({
            isShowDIY: true
          })
          return;
        }
        that.setData({
          worksData: tempArr
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  showCircle(e){
    let that = this;
    let arr = ['4', '5', '6','7','8'];
    wx.showActionSheet({
      itemList: arr,
      success: function (res) {
        let value = arr[res.tapIndex];
        that.circleAction(value);
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  circleAction(e){
    let allcount = e;
    if (allcount => 4 && allcount < 10) {
      var tworksData = [];
      for (var i = 0; i < allcount; i++) {
        var tDic = { content: '休', date: '1' }
        if (i == 0) {
          tDic.date = allcount;
        } else {
          tDic.date = i;
        }
        tworksData[i] = tDic;
      }

      this.setData({
        allCount: allcount,
        worksData: tworksData
      });
    } else {
      wx.showToast({
        title: '格式错误',
      });
    }
  },
  confirmInput(e){
    let allcount = e.detail.value;
    this.circleAction(allcount);
  },
  clearAction(year,month){
    
    let key = year + "****" + month;
    let value = wx.getStorageSync(key);
    if (value) {
      console.log('123_______'+month);
      wx.removeStorageSync(key)
      month++;
      if(month >0 & month <= 12) {
        this.clearAction(year, month);
      }else if(month >= 13) {
        year++;
        month=1;
        this.clearAction(year,month);
      }
    }
  },
  saveAction(e){
    
    let nowDate = new Date();
    //getMonth [0~11]
    this.clearAction(nowDate.getFullYear(),nowDate.getMonth()+1)
    let tempArr = this.data.worksData;
    app.globalData.works = tempArr;
    wx.setStorageSync("works", tempArr);
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  confirmAction(e) {
    let tempStr = e.detail.value;
    if (tempStr.length == 0) {
      wx.showToast({
        title: '还没输入自定义类型呢',
      })
    } else {
      var tempArr = this.data.worksData;

      tempArr[this.data.currentIdx].content = tempStr;
      this.setData({
        worksData: tempArr,
        isShowDIY: false
      })
    }
  },
  cancelAction(e) {
    this.setData({
      isShowDIY: false
    })
  }
})