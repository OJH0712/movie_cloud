// pages/movie/movie.js
const app = getApp()

Page({
    /*登录部分start*/
  cancel:function(){
    wx.showModal({
       title: '警告',
       content: '您点击了拒绝授权,为保障您的利益请进行授权',
       })
   },
  /*登录部分end*/
  /*页面的初始数据*/
  data: {
      login_show:false,
      show:"true",
      num:"2",
      id:"3",
      openid: '',
      address:"广州",
      queryResult:"",
      test:false
  },
  onLoad: function (options) {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // console.log(res)
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
                nickName: res.userInfo.nickName
              })
              app.globalData.avatarUrl = this.data.avatarUrl,
              app.globalData.userInfo = this.data.userInfo,
              app.globalData.nickName = this.data.nickName
            }
          })
        }
      }
    })
    this.onQuery()
  },
  // 获取openid
  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid,
        console.log(app.globalData.openid)
        this.setData({
          login_show: true,
          openid:res.result.openid
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
    // 查询电影
    onQuery: function() {
      const db = wx.cloud.database()
      const openID = app.globalData.openid
      // 初始创建用户表
      db.collection('user').where({
        _openid: db.command.eq(openID)
      }).get({
        success: function(res) {
          if(res.data.length == 0){
            db.collection('user').add({
              data:{
                dingdan:[],
                comment:[]
              }
            })
            console.log('success',res)
          }else{
            console.log('找到openid')
            console.log('success',res.data)
          }
        }
      })
      // 查询当前电影所有的信息
      // db.collection('movie').get({
      //   success: res => {
      //     this.setData({
      //       queryResult: res.data
      //     })
      //     console.log('[数据库] [查询记录] 成功: ', res.data)
      //     console.log('[数据库] [查询记录] 成功: ', this.data.queryResult)
      //   },
      //   fail: err => {
      //     wx.showToast({
      //       icon: 'none',
      //       title: '查询记录失败'
      //     })
      //     console.error('[数据库] [查询记录] 失败：', err)
      //   }
      // })
    },
  // 搜索按钮点击跳转搜索页面
  onSearch() {
    wx.navigateTo({
      url: '../search/search',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
        },
        someEvent: function(data) {
          console.log(data)
          console.log("hello")
        }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      }
    })
  },
  //跳转到影院页面
  onCinema(){
    wx.switchTab({
      url:'../cinema/cinema'
    })
  },
  // 跳转到电影介页面，将id传过去
  onIntroduce(data){
    wx.navigateTo({
      url: './movie_introduce/movie_introduce',
      success:function(res){
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', data.currentTarget.id)
      }
    })
  },

})