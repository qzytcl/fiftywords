// components/DIYView/DIYView.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    inputValue: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    inputAction(e) {
      this.setData({
        inputValue: e.detail.value
      })
    },
    cancelAction(e) {
      this.triggerEvent('cancelEvent');
      this.setData({
        inputStr: ""
      })
    },
    confirmAction(e) {
      this.triggerEvent('confirmEvent', { value: this.data.inputValue });
      this.setData({
        inputStr: ""
      })
    }
  }
})
