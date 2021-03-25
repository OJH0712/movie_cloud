
Page({
  /**
   * 页面的初始数据
   */
  data: {
      active: 1,
      autoplay:true,
      movie_list:[],
      movie_list_temp:[],
      movie_detail:[],
      cinema_detail:[],
      id:"",
      cinema_title:"",
      cinema_address:"",
      key:"0",
      index:"0",//排期栏滑动时的index
      default_img:"https://p0.meituan.net/movie/df84690ded848edf709187eae23a7969866455.jpg@464w_644h_1e_1c",
      img_url:""
  },
  
// 获取当前的电影序号，并在电影序号变化时，下面的排期跟着变化
  onkey:function(e){
      console.log(e.detail.current);
      this.setData({
        key:e.detail.current,
        movie_list_temp:this.data.movie_list[e.detail.current],
        img_url:this.data.movie_detail[e.detail.current].img_url
      })
      console.log("movie_list_temp:",this.data.movie_list_temp)
      console.log("img_url:",this.data.img_url)

  },
  //进入购买页面&&将此页面的购票有效信息传给购买页面
  onPurchase:function(data){
    let dataset = data.currentTarget.dataset
    let date = this.data.date_list[this.data.index];//日期
    let cinema_name = this.data.cinema_title//影院名字
    let movie_name = this.data.movie_detail[this.data.key].title//电影名字
    let img_url = this.data.img_url//电影图片
    wx.navigateTo({
      url: '../../../pages/choose_seat/choose_seat',
      success:function(res){
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('date', date)
        res.eventChannel.emit('language', dataset.language)
        res.eventChannel.emit('price', dataset.price)
        res.eventChannel.emit('onplay', dataset.onplay)
        res.eventChannel.emit('play_id', dataset.play_id)
        res.eventChannel.emit('play_place', dataset.play_place)
        res.eventChannel.emit("cinema_name",cinema_name)
        res.eventChannel.emit("movie_name",movie_name)
        res.eventChannel.emit("img_url",img_url)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取事件对象
    const eventChannel = this.getOpenerEventChannel()
    new Promise((resolve, reject) => {
          // 获取上一页面传来的信息
        eventChannel.on('myPage_1', (id) => {
          this.setData({  
            id: id,
          })
          resolve('id')
        });
        eventChannel.on('myPage_2', (cinema_title) => {
          this.setData({  
            cinema_title: cinema_title,
          })
        });
        eventChannel.on('myPage_3', (cinema_address) => {
          this.setData({  
            cinema_address: cinema_address,
          })
        });
    }).then((res)=>{
      // onload加载cinema_detail的数据
      this.onQuery_detail();
      console.log("测试数据",this.onQuery_detail())
      // onload加载movie的数据
      this.onQuery_movie();
      console.log(res)
      console.log('id',this.data.id)
      console.log('cinema_title',this.data.cinema_title)
      console.log('cinema_address',this.data.cinema_address)
    })

    // 提醒获取排期的方式
    let that = this;
    wx.showModal({
      title: '温馨提示',
      content: '请滑动影片获取观影信息',
      success (res) {
        if (res.confirm) {
          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    // 进入页面时，跳转一次
    let stopAuto = setTimeout(function(){
      that.setData({
        autoplay:false
      })
    },1500)
    stopAuto
  },
  // 获取cinema_detail的数据
   onQuery_detail:function() {
    const db = wx.cloud.database()
    db.collection('cinema_detail').where(
      {
        cinema_id:this.data.id
      }
    ).get({
      success: res => {
        this.setData({
          cinema_detail: res.data,
          movie_list:res.data[0].movie_list
        })
        console.log('cinema_detail 成功: ', res.data)
        console.log('movie_list 成功: ', this.data.movie_list)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
    return true
  },
  // 获取电影信息
  onQuery_movie: function() {
    const db = wx.cloud.database()
    // console.log(this.data.openid)
    db.collection('movie').get({
      success: res => {
        this.setData({
          movie_detail: res.data,
        })
        console.log('movie_detail 成功: ', res.data)
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
  // 获取今天的日期，算出往后四天的电影排期
  onDate:function(){
    let date_list = [];
    let time = new Date();
    let month = time.getMonth()+1;
    let day  = time.getDate();
    let day_31 = [1,3,5,7,8,10,12];
    let day_30 = [4,6,9,11];
    let day_29 = [2]
    // ？？？？获取不到已经加载到页面的数据
    console.log("获取到属性",this.data.cinema_detail);
    for(let i=0; i<=4;i++){
      let date = month+"月"+day+"日";
      day = day+1;
      if(day_31.indexOf(month)!==-1&&day>31){
        month_temp=month+1
        date = month_temp+"月"+day+"日"
      }
      if(day_30.indexOf(month)!==-1&&day>30){
        month_temp=month+1
        date = month_temp+"月"+day+"日"
      }
      if(day_29.indexOf(month)!==-1&&day>29){
        month_temp=month+1
        date = month_temp+"月"+day+"日"
      }
      date_list.push(date)
    }
    this.setData({
      date_list:date_list
    })
    // console.log(this.data.date_list)
  },
  // 移动日期属性时显示不同的排期（获取其中的move_key）
  onChange:function(e){
    console.log(e.detail.index);
    this.setData({
      index:e.detail.index
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
        // // 获取今后四天的电影排期
        // this.onDate()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      // 获取今后四天的电影排期
      this.onDate()
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
