// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({ env: "lost-found-9gf6k1tce66b0eb1" }); // 使用当前云环境

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const wxContext = cloud.getWXContext();

    // 如果没有该 openId 用户，注册用户
    const serverDate = db.serverDate();
    const { _id } = await db.collection("found_record").add({
      data: {
        openId: event.openId,
        title: event.title,
        foundTime: event.foundTime,
        address: event.address,
        phoneNumber: event.phoneNumber,
        desc: event.desc,
        imageList: event.imageFileList,
        createTime: serverDate,
        updateTime: serverDate
      }
    });
    return ({ data } = await db
      .collection("lost_record")
      .where({
        _id
      })
      .get());
  } catch (e) {
    console.error(e);
  }
};
