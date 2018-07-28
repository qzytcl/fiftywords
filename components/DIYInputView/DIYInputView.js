// components/DIYInputView/DIYInputView.js
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
    inputStr:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    inputAction(e) {
      console.log(e.detail.value);
      this.setData({
        inputStr:e.detail.value
      })
    },
    submitAction(e) {
      console.log(this.data.inputStr);
      this.triggerEvent('submitEvent', {'value':this.data.inputStr});
      this.setData({
        inputStr: ""
      })
    },
    cancelAction(e){
      this.triggerEvent('cancelEvent');
      this.setData({
        inputStr: ""
      })
    }
  }
})
