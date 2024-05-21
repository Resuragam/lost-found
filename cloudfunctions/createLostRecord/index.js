// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({ env: "lost-found-1gt37wpb57342ea8" }); // 使用当前云环境

const db = cloud.database();
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const wxContext = cloud.getWXContext();

    // 如果没有该 openId 用户，注册用户
    const serverDate = db.serverDate();
    await db.collection("lost_record").add({
      data: {
        openId: event.openId,
        title: event.title,
        lostTime: event.lostTime,
        address: event.address,
        phoneNumber: event.phoneNumber,
        desc: event.desc,
        imageList: event.imageFileList,
        createTime: serverDate,
        updateTime: serverDate
      }
    });
    await db.collection('user').where({
      openId: event.openId
    }).update({
      data: {
        lostTotal: _.inc(1)
      },
    })
    
    return {
      code: 200,
      data: null
    }
  } catch (e) {
    console.error(e);
  }
};
