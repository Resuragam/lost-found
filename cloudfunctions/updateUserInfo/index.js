// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }); // 使用当前云环境

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    db.collection("user")
      .where({
        openId: event.openId
      })
      .update({
        nickname: event.nickname,
        phoneNumber: event.phoneNumber,
        avatar: event.avatar
      });
  } catch (e) {
    console.error(e);
  }
  const wxContext = cloud.getWXContext();

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID
  };
};
