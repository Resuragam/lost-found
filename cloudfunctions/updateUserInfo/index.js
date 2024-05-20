// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({ env: "lost-found-1gt37wpb57342ea8" }); // 使用当前云环境

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const wxContext = cloud.getWXContext();
    console.log("openid: ", event.openId);
    const data = {
      nickname: event.nickname,
      phoneNumber: event.phoneNumber
    };
    event.fileId &&
      Object.assign(data, {
        avatar: event.fileId
      });

    const res = await db
      .collection("user")
      .where({
        openId: event.openId
      })
      .update({
        data: data
      });
    return res;
  } catch (e) {
    console.error(e);
  }
};
