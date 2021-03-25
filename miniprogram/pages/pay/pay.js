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
    random_code:0,
    img_url:"",
  },
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  // 用户创建&&添加数据
user_add(){
  let that = this
  const db = wx.cloud.database()
  const openID = app.globalData.openid
  db.collection('user').where({
    _openid: db.command.eq(openID)
  }).get({
    success: function(res) {
      if(res.data.length == 0){
        console.log('未找到openid')
        console.log('success',res)
      }else{
        console.log('找到openid')
        console.log('success',res.data)
      }
    }
  })
  db.collection('user').where({
    _openid:openID
  }).update({
    data:{
      dingdan:db.command.push({
          cinema_name: that.data.cinema_name,
          movie_name: that.data.movie_name,
          date: that.data.date,
          onplay: that.data.onplay,
          total_price: that.data.total_price,
          array: that.data.array,
          random_code: that.data.random_code,
          price: that.data.cinema_name,
          price: that.data.cinema_name,
          img_url: that.data.img_url,
          play_place: that.data.play_place,
        })
    },
    success:(res)=>{
      console.log("新增成功",res)
    },
    fail: err => {
      console.log("新增失败",err)
    }
  })
  // if()
  // db.collection('user').add({
  //   data:{
  //     dingdan:[{
  //         cinema_name: that.data.cinema_name,
  //         movie_name: that.data.movie_name,
  //         date: that.data.date,
  //         onplay: that.data.onplay,
  //         total_price: that.data.total_price,
  //         array: that.data.array,
  //         random_code: that.data.random_code,
  //         price: that.data.cinema_name,
  //         price: that.data.cinema_name,
  //         img_url: that.data.img_url,
  //         play_place: that.data.play_place
  //       }]
  //   },
  //   success:(res)=>{
  //     console.log("新增成功",res._id)
  //   }
  // })
},
// 创建随机验票码
OnRandom(){
  let code = Math.floor(Math.random()*10000)
  this.setData(
    {
      random_code:code
    }
  )
},
// 测试
test(){
  console.log(this.data.img_url)
  this.user_add()
  },
  // 支付点击
  Pay(){
    wx.requestSubscribeMessage({
      tmplIds: ['lt6Ny3UDN_f_z9pTgP-2ASuJXLIBvgoCLNNN-FQpg-M'],
    }).then(res=>{
      console.log("授权成功",res)
      this.OnRandom()
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
      console.log("获取openid失败",res)
    })
  },
  Send(openid){
    let total_price = this.data.total_price.toFixed(2)
    const that = this
    let time = this.getTime()
    wx.cloud.callFunction({
      name:"sendMsg",
      data:{openid:openid,total_price,time}
    }).then((res)=>{
      console.log("推送消息成功",res)
      wx.showToast({
        title: '支付成功！',  // 标题
        icon: 'success',   // 图标类型，默认success 图标支持开发文档的icon
        duration: 1500   // 图标停留时间，默认1500ms
    })    
      wx.navigateTo({
        url: '../../pages/mine/dingdan/dingdan',
        success:function(res){
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('date', that.data.date)
          res.eventChannel.emit('total_price', that.data.total_price)
          res.eventChannel.emit('price', that.data.price)
          res.eventChannel.emit('onplay', that.data.onplay)
          res.eventChannel.emit('play_place', that.data.play_place)
          res.eventChannel.emit("cinema_name",that.data.cinema_name)
          res.eventChannel.emit("movie_name",that.data.movie_name)
          res.eventChannel.emit("seat_position",that.data.seat_position)
          res.eventChannel.emit("img_url",that.data.img_url)
        }
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
    // 获取上一页面传来的播出电影图片
    eventChannel.on('img_url', (res) => {
      this.setData({  
        img_url: res,
      })
    });
    console.log(this.data.img_url)
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