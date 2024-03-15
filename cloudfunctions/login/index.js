// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: 'lost-found-9gf6k1tce66b0eb1' }) // 使用当前云环境

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    try {
      const wxContext = cloud.getWXContext()
      const { data } = await db.collection('user').where({
        openId: event.openId
      }).get()
  
      if(!data.length) {
        const res = await db.collection('user').add({
          data: {
            openId: event.openId
          }
        })
        console.log(res)
      }
      return {
        data
      }
    }catch(e) {
      return new Error (e.message)
    }
}