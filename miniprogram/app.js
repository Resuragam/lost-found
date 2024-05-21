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
        env: "lost-found-1gt37wpb57342ea8",
        traceUser: true
      });

      // 获取用户 openId
      wx.showLoading({
        title: '登录中...',
      })
      const [getOpenIdErr, openId] = await awaitWrap(getOpendId());
      if (getOpenIdErr) {
        return wx.showToast({
          title: "登录失败",
          icon: "error"
        });
      }
      console.log("openid: ", openId);
      wx.setStorageSync("openId", openId);

      const [loginErr, loginRes] = await awaitWrap(login(openId));
      if (loginErr) {
        return wx.showToast({
          title: "登录失败",
          icon: "error"
        });
      }
      console.log(loginRes[0])
      this.globalData.userInfo.nickname = loginRes[0].nickname;
      this.globalData.userInfo.avatarUrl = loginRes[0].avatar;
      this.globalData.userInfo.phoneNumber = loginRes[0].phoneNumber;
      this.globalData.foundTotal = loginRes[0].foundTotal;
      this.globalData.lostTotal = loginRes[0].lostTotal;
      this.globalData.college = loginRes[0].college;
      this.globalData.studentNumber = loginRes[0].studentNumber;
      this.globalData.status = loginRes[0].status;
      console.log("loginRes: ", loginRes);
      console.log("globalData: ", this.globalData.userInfo);
    }
  },
  globalData: {
    userInfo: {
      nickname: "默认名称",
      avatarUrl:
        "cloud://lost-found-1gt37wpb57342ea8.6c6f-lost-found-1gt37wpb57342ea8-1323247746/public/9d82d158ccbf6c8109428c4449b4263832fa40b9.jpeg@f_auto.webp",
      phoneNumber: "",
      foundTotal: 0,
      lostTotal: 0,
      college: "",
      studentNumber: '',
      status: 0,
    }
  }
});
