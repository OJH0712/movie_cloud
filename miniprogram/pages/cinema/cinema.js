// pages/index/cinema/cinema.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      cinema_list:"",
      list:""
  },
  onSearch(value){
    let val = value.detail.replace(/\s*/g, '')
    let that = this
    // 1. 获取数据库引用
    const db = wx.cloud.database()
    db.collection('cinemaList').where({
      cinema_title:db.RegExp({
        regexp:val,
        options:'i'
      })
    }
      ).get({
      success: function(res) {
      that.setData({
        list:res.data
      })
      }
      })
    },
  onCancel(){
    this.setData({
      list:""
    })
  },
  // 将影院的部分信息传输到影院细节页面
  onIntroduce(data){
    // console.log(data.currentTarget.dataset)
    let dataset = data.currentTarget.dataset
    wx.navigateTo({
      url: './cinnema_info/cinema_info',
      success:function(res){
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('myPage_1', data.currentTarget.id)
        res.eventChannel.emit('myPage_2', dataset.cinema_title)
        res.eventChannel.emit('myPage_3', dataset.cinema_address)
      }
    })
  },
   // 从数据库查询电影院列表
   onQuery: function() {
    const db = wx.cloud.database()
    // console.log(this.data.openid)
    db.collection('cinemaList').get({
      success: res => {
        this.setData({
          cinema_list: res.data
        })
        console.log('[数据库] [查询记录] 成功: ', res.data)
        // console.log('[数据库] [查询记录] 成功: ', this.data.cinema_list)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onQuery()
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