// miniprogram/pages/pay/pay.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "",
    array:[],
    clo:4,
    price:0,
    total_price:0,
    seat_position:[],
    date:"",
    language:"",
    onplay:"",
    play_place:"",
    cinema_name:"",
    movie_name:"",
  },
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  // 测试点击
  Show(){
    wx.requestSubscribeMessage({
      tmplIds: ['lt6Ny3UDN_f_z9pTgP-2ASuJXLIBvgoCLNNN-FQpg-M'],
    }).then(res=>{
      console.log("授权成功",res)
      this.getOpenid()
    }).catch(res=>{
      console.log("授权失败",res)
    })
  },
  getOpenid(){
    wx.cloud.callFunction({
      name:"getopenid"
    }).then(res=>{
      let openid = res.result.openid
      console.log("获取openid成功",openid)
      this.Send(openid)
    }).catch(res=>{
      console.log("获取openid失败",openid)
    })
  },
  Send(openid){
    let price = this.data.price.toFixed(2)
    let time = this.getTime()
    wx.cloud.callFunction({
      name:"sendMsg",
      data:{openid:openid,price,time}
    }).then((res)=>{
      console.log("推送消息成功",res)
      wx.showToast({
        title: '支付成功！',  // 标题
        icon: 'success',   // 图标类型，默认success 图标支持开发文档的icon
        duration: 1500   // 图标停留时间，默认1500ms
    })    
      wx.switchTab({
        url: '../../pages/mine/mine',
      })
    }).catch((res)=>{
      console.log("推送消息失败",res)
    })
  },
  getTime(){
    var myDate = new Date();
    let year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    let month = myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
    let date = myDate.getDate();        //获取当前日(1-31)
    let hours = myDate.getHours();       //获取当前小时数(0-23)
    let minutes = myDate.getMinutes();     //获取当前分钟数(0-59)
    if(minutes<10){
      minutes = "0"+minutes.toString()
    }
    if(hours<10){
      hours = "0"+hours.toString()
    }
    let res = year+"年"+month+"月"+date+"日"+" "+hours+":"+minutes 
    console.log(res)
    return res
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**************数据获取start *****************/
    //获取事件对象
    const eventChannel = this.getOpenerEventChannel()
    // 获取上一页面传来的座位总数
    eventChannel.on('array', (res) => {
      this.setData({  
      	array: res,
      })
    });
    console.log("座位总数",this.data.array)
    // 获取上一页面传来的选择的座位
    eventChannel.on('seat_position', (res) => {
      this.setData({  
      	seat_position: res,
      })
    });
    console.log("选择的座位",this.data.seat_position)
    // 获取上一页面传来的日期
    eventChannel.on('date', (res) => {
      this.setData({  
      	date: res,
      })
    });
    // 获取上一页面传来的语言类型
    eventChannel.on('language', (res) => {
      this.setData({  
      	language: res,
      })
    });
    console.log("语言类型",this.data.language)
    // 获取上一页面传来的价格
    eventChannel.on('price', (res) => {
      this.setData({  
      	price: res,
      })
    });
    console.log(this.data.price)
   // 获取上一页面传来的总价格
   eventChannel.on('total_price', (res) => {
    this.setData({  
      total_price: res,
    })
  });
  console.log(this.data.total_price)
    // 获取上一页面传来的播出时间
    eventChannel.on('onplay', (res) => {
      this.setData({  
      	onplay: res,
      })
    });
    console.log(this.data.onplay)
    // 获取上一页面传来的播出影厅
    eventChannel.on('play_place', (res) => {
      this.setData({  
      	play_place: res,
      })
    });
    console.log(this.data.play_place)
    // 获取上一页面传来的播出影院
    eventChannel.on('cinema_name', (res) => {
      this.setData({  
      	cinema_name: res,
      })
    });
    console.log(this.data.cinema_name)
    // 获取上一页面传来的播出电影
    eventChannel.on('movie_name', (res) => {
      this.setData({  
      	movie_name: res,
      })
    });
    console.log(this.data.movie_name)
    /**************数据获取end *****************/
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

  }
})