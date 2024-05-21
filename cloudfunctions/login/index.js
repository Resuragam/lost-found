// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({ env: "lost-found-1gt37wpb57342ea8" }); // 使用当前云环境

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const wxContext = cloud.getWXContext();

    // 根据 openId 获取玩家用户信息
    let { data } = await db
      .collection("user")
      .where({
        openId: event.openId
      })
      .get();

    // 如果没有该 openId 用户，注册用户
    if (!data.length) {
      const serverDate = db.serverDate();
      const { _id } = await db.collection("user").add({
        data: {
          openId: event.openId,
          nickname: `用户_${event.openId.substring(1, 8)}`,
          avatar:
            "cloud://lost-found-1gt37wpb57342ea8.6c6f-lost-found-1gt37wpb57342ea8-1323247746/user/b_da008bf0a8c1c20b40590fbf990c6cea.jpg",
          phoneNumber: null,
          createTime: serverDate,
          updateTime: serverDate,
          lostTotal: 0,
          foundTotal: 0
        }
      });
      return ({ data } = await db
        .collection("user")
        .where({
          _id
        })
        .get());
    }

    const lostRes = await db
      .collection("lost_record")
      .where({
        openId: event.openId
      })
      .count();
    const foundRes = await db
      .collection("found_record")
      .where({
        openId: event.openId
      })
      .count();

    return {
      data,
    };
  } catch (e) {
    console.error(e);
  }
};
