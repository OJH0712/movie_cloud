// pages/mine/dingdan/dingdan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 /**************数据获取start *****************/
    //获取事件对象
    const eventChannel = this.getOpenerEventChannel()
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
    console.log("日期",this.data.date)
    // 获取上一页面传来的价格
    eventChannel.on('price', (res) => {
      this.setData({  
      	price: res,
      })
    });
    console.log("价格",this.data.price)
   // 获取上一页面传来的总价格
   eventChannel.on('total_price', (res) => {
    this.setData({  
      total_price: res,
    })
  });
  console.log("总价格",this.data.total_price)
    // 获取上一页面传来的播出时间
    eventChannel.on('onplay', (res) => {
      this.setData({  
      	onplay: res,
      })
    });
    console.log("时间",this.data.onplay)
    // 获取上一页面传来的播出影厅
    eventChannel.on('play_place', (res) => {
      this.setData({  
      	play_place: res,
      })
    });
    console.log("影厅",this.data.play_place)
    // 获取上一页面传来的播出影院
    eventChannel.on('cinema_name', (res) => {
      this.setData({  
      	cinema_name: res,
      })
    });
    console.log("影院",this.data.cinema_name)
    // 获取上一页面传来的播出电影
    eventChannel.on('movie_name', (res) => {
      this.setData({  
      	movie_name: res,
      })
    });
    console.log("电影",this.data.movie_name)
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