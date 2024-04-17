// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env:'lost-found-9gf6k1tce66b0eb1' }) // 使用当前云环境
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const { data } = await db
      .collection("space").get()
    console.log(data)
    return  {
      data
    }
}