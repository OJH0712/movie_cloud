var wxCharts = require('../../utils/wxcharts-min.js');
var app = getApp();
var pieChart = null;
Page({
    data: {
      watch_num:[]
    },
    touchHandler: function (e) {
        console.log(pieChart.getCurrentDataIndex(e));
    },        
    onLoad: function (e) {
      //获取事件对象
    const eventChannel = this.getOpenerEventChannel()
    new Promise((resolve, reject) => {
          eventChannel.on('watch_num', (watch_num) => {
                  this.setData({  watch_num: watch_num})
                  resolve(watch_num)
          })
    }).then((res)=>{
      console.log(res)
    })
        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }
        const that = this
        pieChart = new wxCharts({
            animation: true,
            canvasId: 'pieCanvas',
            type: 'pie',
            // series: [{
            //     name: '北京',
            //     data: 15,
            // }, {
            //     name: '上海',
            //     data: 35,
            // }, {
            //     name: '广州',
            //     data: 78,
            // }, {
            //     name: '重庆',
            //     data: 63,
            // },],
            series:that.data.watch_num,
            width: windowWidth,
            height: 300,
            dataLabel: true,
        });
    }
});