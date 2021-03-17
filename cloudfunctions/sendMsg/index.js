// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  try{
    const result = await cloud.openapi.subscribeMessage.send({
      // touser:event.openid,//要推送的用户
      touser:event.openid,//要推送的用户
      templateId:'lt6Ny3UDN_f_z9pTgP-2ASuJXLIBvgoCLNNN-FQpg-M',//模板id
      page:'pages/mine/mine',//要跳转到哪个小程序页面
      miniprogramState: 'developer',
      data:{
        thing1:{
          value:'电影票购买成功'
        },
        time2:{
          value:event.time
        },
        amount3:{
          value:event.price
        }
      },
    })
    console.log(result)
    return result
  }catch(err){
    return err
  }
}