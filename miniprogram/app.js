const { getOpendId, login } = require("./api/user");
const { awaitWrap } = require("./utils/awaitWrap");

// app.js
App({
  onLaunch: async function () {
    // 导航栏数据初始化
    // 云函数环境初始化
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        env: "lost-found-9gf6k1tce66b0eb1",
        traceUser: true
      });

      // 获取用户 openId
      const [getOpenIdErr, openId] = await awaitWrap(getOpendId())
      if(getOpenIdErr) {
        return wx.showToast({
          title: '登录失败',
          icon: "error"
        })
      }
      console.log('openid: ', openId)

      const [loginErr, loginRes] = await awaitWrap(login(openId))
      if(loginErr) {
        return wx.showToast({
          title: '登录失败',
          icon: "error"
        })
      }
      console.log('loginRes: ', loginRes)
    }

  },
  globalData: {
    userInfo: {}
  }
});
