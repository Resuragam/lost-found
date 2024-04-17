// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({ env: "lost-found-9gf6k1tce66b0eb1" }); // 使用当前云环境

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    // 连接失物记录表和用户表
    const foundRecords = await db
      .collection("found_record")
      .aggregate() // 使用聚合操作来实现联表查询
      .lookup({
        from: "user", // 指定要连接的集合（用户表）
        localField: "openId", // 失物记录表中用于连接的字段
        foreignField: "openId", // 用户表中用于连接的字段
        as: "userInfo" // 连接后的用户信息存储在 userInfo 字段
      })
      .end();
    // 处理返回的数据，只保留需要的用户信息字段
    console.log('foundRecords', foundRecords)
    const processedRecords = foundRecords.list.map(record => {
      if (record.userInfo.length > 0) {
        const user = record.userInfo[0];
        record.userAvatar = user.avatar;
        record.userNickname = user.nickname;
      }
      delete record.userInfo;
      return record;
    });

    return {
      code: 0,
      data: processedRecords,
      message: "查询成功"
    };
  } catch (e) {
    return {
      code: -1,
      message: `查询失败：${e}`
    };
  }
};