// components/ShowLunarView/ShowLunarView.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    lDate: {
      type: Object,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    cancelAction(e) {
      this.triggerEvent('cancelEvent');
    }
  }
})
