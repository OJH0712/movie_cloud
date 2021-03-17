// pages/search/search.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    value: '',
  },
  // 搜索栏内容更改
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  // 将搜索框内搜索的内容显示
  onSearch() {
    Toast('搜索' + this.data.value);
  },
  onClick() {
    wx.navigateTo({
      url: '../cinema/cinema',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
        },
        someEvent: function(data) {
          console.log(data)
        }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})