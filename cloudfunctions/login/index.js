// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init({ env: "lost-found-9gf6k1tce66b0eb1" }); // 使用当前云环境

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
            "cloud://lost-found-9gf6k1tce66b0eb1.6c6f-lost-found-9gf6k1tce66b0eb1-1323247746/public/9d82d158ccbf6c8109428c4449b4263832fa40b9.jpeg@f_auto.webp",
          phoneNumber: null,
          createTime: serverDate,
          updateTime: serverDate,
          lostRecordTotal: 0,
          foundRecordToatl: 0
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
      data: {
        ...data,
        lostRecordTotal: lostRes.total,
        foundRecordToatl: foundRes.total
      }
    };
  } catch (e) {
    console.error(e);
  }
};
