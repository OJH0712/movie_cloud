// pages/movie/movie_inroduce/movie_inroduce.js
Page({
  data: {
    value:4.5,
    queryResult:"",
  },

  onLoad: function (options) {
    //获取事件对象
    const eventChannel = this.getOpenerEventChannel()
    new Promise((resolve, reject) => {
          eventChannel.on('acceptDataFromOpenerPage', (id) => {
                  this.setData({  id: id})
                  resolve(id)
          })
    }).then((res)=>{
      console.log(res)
      this.onQuery()
    })
  },
  onQuery: function() {
    const db = wx.cloud.database();
    db.collection('movieIntroduce').where({
      id:this.data.id
    }).get({
      success: res => {
        this.setData({
          queryResult: res.data[0]
        })
        console.log('[数据库] [查询记录] 成功: ', res.data)
        console.log('[数据库] [查询记录] 成功: ', this.data.queryResult.en_title)
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
})