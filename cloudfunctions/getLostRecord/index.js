// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({ env: "lost-found-9gf6k1tce66b0eb1" }); // 使用当前云环境

const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    let regExPattern;
    if (!event.search) {
      regExPattern = new RegExp(".*");
    } else {
      let pattern = `${event.search}.*`;
      regExPattern = new RegExp(pattern, "gi");
    }
    // 连接失物记录表和用户表
    const lostRecords = await db
      .collection("lost_record")
      .aggregate() // 使用聚合操作来实现联表查询
      .lookup({
        from: "user", // 指定要连接的集合（用户表）
        localField: "openId", // 失物记录表中用于连接的字段
        foreignField: "openId", // 用户表中用于连接的字段
        as: "userInfo" // 连接后的用户信息存储在 userInfo 字段
      })
      .end();

    // 处理返回的数据，只保留需要的用户信息字段
    const processedRecords = lostRecords.list
      .map(record => {
        if (record.userInfo.length > 0) {
          const user = record.userInfo[0];
          record.userAvatar = user.avatar; // 用户头像
          record.userNickname = user.nickname; // 用户昵称
        }
        delete record.userInfo; // 删除原始的 userInfo 字段
        return record;
      })
      .filter(record => regExPattern.test(record.title));

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
