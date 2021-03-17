// miniprogram/pages/choose_seat/choose_seat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[
      [0,0,0,2],
      [0,0,0,0]
    ],
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
  // 状态改变触发
  getTypeByStatus:function(obj) {
    if(obj == 1){
      return 'seat_choosed'
    }else{
      return " "
    }
  },

  // 选择点击触发
  choose:function(e){
    console.log(e)
    let that = this;
    let id = e.currentTarget.id;
    let y = id%this.data.clo;
    let x = (id-y)/this.data.clo;
    let col = 'array['+x+']['+ y +']';
    let count = 0;
    let totalPrice = 0;
    let array = this.data.array;
    let seat_position = that.data.seat_position
    console.log("x",x);
    console.log("y",y);
    // 判断点击
    if(this.data.array[x][y] == 1){
      for(let i in seat_position){
        if(seat_position[i].id == id){
          seat_position.splice(i,1)
        }
      }
      // console.log("id",id);
      // console.log("seat_position",seat_position);
      that.setData({
        [col] : 0,
        seat_position:seat_position
      })
    }else if(this.data.array[x][y] == 2){
      wx.showModal({
          title: '提示',
          content: '该位置已被选',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
    }else{
      seat_position.push({
        id:id,
        x:x,
        y:y
      })
      that.setData({
        [col] : 1,
        seat_position:seat_position
      })
    }
    console.log(this.data.array)
    // 点击后计算总价
    for(let i in array){
      for (let j in array[i]){
        if(array[i][j]==1){
          count++
        }
      }
    }
    totalPrice =  Math.round(this.data.price*count * 100) / 100
    console.log("总价",totalPrice)
    that.setData({
      total_price:totalPrice
    })
  },
    // 确认选座
    confirm:function(e){
      let that = this;
      let array = e.currentTarget.dataset.array;
      let seat_position = that.data.seat_position;
      let total_price = that.data.total_price;
      let price = that.data.price;
      let date = that.data.date;
      let cinema_name = that.data.cinema_name;
      let movie_name = this.data.movie_name;
      let onplay = that.data.onplay;
      let play_place = that.data.play_place;
      let language = that.data.language;
      
      if(seat_position.length == 0){
        wx.showModal({
          title: '提示',
          content:'请先选择座位'
        })
      }else{
        // 跳转确定支付页面
        wx.navigateTo({
          url: '../../pages/pay/pay',
          success:function(res){
            // 通过eventChannel向被打开页面传送数据
            res.eventChannel.emit('date', date)
            res.eventChannel.emit('language',language)
            res.eventChannel.emit('total_price', total_price)
            res.eventChannel.emit('price', price)
            res.eventChannel.emit('onplay', onplay)
            res.eventChannel.emit('play_place', play_place)
            res.eventChannel.emit("cinema_name",cinema_name)
            res.eventChannel.emit("movie_name",movie_name)
            res.eventChannel.emit("seat_position",seat_position)
            res.eventChannel.emit("array",array)
          }
        })
      }
    },
  /**
   * 生命周期函数--监听页面加载
  //  */
  onLoad: function (options) {
    /**************数据获取start *****************/
    //获取事件对象
    const eventChannel = this.getOpenerEventChannel()
    new Promise((resolve,reject)=>{
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

      // 获取上一页面传来的播出时间
      eventChannel.on('onplay', (res) => {
        this.setData({  
          onplay: res,
        })
      });
      console.log(this.data.onplay)

      // 获取上一页面传来的播出时间的id
      eventChannel.on('play_id', (res) => {
        this.setData({  
          play_id: res,
        })
      });
      console.log(this.data.play_id)
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
      resolve(res)
      console.log(this.data.movie_name)
    });
    }).then((res)=>{
      console.log('电影名',res)
    })

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