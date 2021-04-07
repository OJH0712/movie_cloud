// pages/mine/dingdan/dingdan.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
//拉取云数据库用户表的数据
pullData:function(){
  const db = wx.cloud.database()
  const openID = app.globalData.openid
  const that = this
  // 获取其中数据
  db.collection('user').where({
    _openid: db.command.eq(openID)
  }).get({
    success: function(res) {
        console.log("获取的数据",res.data[0].dingdan)
        const data = res.data[0].dingdan
        that.getdata(data)
    }
  })
},
// 将数据赋予当前的data
getdata:function(data){
  // console.log("返回的数据",data)
  this.setData({
    querydata: data
  })
  console.log("返回的数据",this.data.querydata)
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 /**************数据获取start *****************/
  this.pullData()
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