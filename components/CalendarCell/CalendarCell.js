// components/CalendarCell/CalendarCell.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dayTime:{
      type:String,
      value:""
    },
    dayStatus:{
      type:String,
      value:""
    },
    dayFestival:{
      type:String,
      value:""
    },
    realDay:{
      type: String,
      value: ""
    },
    realMonth:{
      type: String,
      value: ""
    },
    realYear:{
      type: String,
      value: ""
    },
    month:{
      type: String,
      value: ""
    },year:{
      type: String,
      value: ""
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
    refreshSelect(e){
      // console.log(e);
      // console.log(this.data.month,this.data.year);
      this.triggerEvent("longpressCalendarCell",{"month":this.data.month,"year":this.data.year});
    }
  }
})
