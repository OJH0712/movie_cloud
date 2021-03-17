// 第一种
Page({
  /**
    * 页面的初始数据
    */
  data: {
  //设置标记点
  markers: [
  {
  iconPath: "/images/ljx.png",
  id: 4,
  latitude: 31.938841,
  longitude: 118.799698,
  width: 30,
  height: 30
  }
  ],
  //当前定位位置
  latitude:'',
  longitude: '',
  },
  navigate() {
  ////使用微信内置地图查看标记点位置，并进行导航
  wx.openLocation({
  latitude: this.data.markers[0].latitude,//要去的纬度-地址
  longitude: this.data.markers[0].longitude,//要去的经度-地址
  })
  },
  onLoad() {
  //获取当前位置
  wx.getLocation({
  type: 'gcj02',
  success: (res) => {
  console.log(res)
  this.setData({
  latitude: res.latitude,
  longitude: res.longitude
  })
  }
  })
  }
  })

// 第二种
// Page({
//   data:{
//    longitude: 113.324520,
//    latitude: 23.099994,
//    markers:[{
//      id: 0,
//      iconPath: "../../images/icon_cur_position.png",
//      latitude: 23.099994,
//      longitude: 113.324520,
//      width: 50,
//      height: 50
//    }]
//   },
//   onLoad: function(){
//     var that = this;
//     wx.getLocation({
//       type: "wgs84",
//       success: function(res){
//         var latitude = res.latitude;
//         var longitude = res.longitude;
//        //console.log(res.latitude);
//         that.setData({
//          latitude: res.latitude,
//          longitude: res.longitude,
//          markers:[{
//            latitude: res.latitude,
//            longitude: res.longitude
//          }]
//         })
//       }
//     })
//   }
// })
