// pages/my/myPage/index.js
const app = getApp();
Page({
  data: {
    nickname: "测试名称",
    avatarUrl: "https://tdesign.gtimg.com/mobile/demos/avatar1.png",
    lostRecordNum: 0,
    foundRecordNum: 0
  },
  onShow() {
    this.getTabBar().init();
  },
  onLoad() {
    this.setData({
      avatarUrl: app.globalData.userInfo.avatarUrl,
      nickname: app.globalData.userInfo.nickname
    });
  },
  toLostRecord() {
    wx.navigateTo({
      url: "/pages/my/lostRecord/index"
    });
  },
  toFoundRecord() {
    wx.navigateTo({
      url: "/pages/my/foundRecord/index"
    });
  }
});
