// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({ env: "lost-found-1gt37wpb57342ea8" }); // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID
  };
};
