// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: 'lost-found-9gf6k1tce66b0eb1' }) // 使用当前云环境

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    try {
      const wxContext = cloud.getWXContext()

      // 根据 openId 获取玩家用户信息
      let { data } = await db.collection('user').where({
        openId: event.openId
      }).get()
      
      // 如果没有该 openId 用户，注册用户
      if(!data.length) {
        const { _id } = await db.collection('user').add({
          data: {
            openId: event.openId
          }
        })
        return { data } = await db.collection('user').where({
          _id,
        }).get() 
      }

      return {
        data
      }

    }catch(e) {
      console.error(e)
    }
}