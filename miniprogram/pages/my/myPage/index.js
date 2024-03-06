// pages/my/myPage/index.js
const app = getApp();
Page({
  data: {
    nickName: "测试名称",
    avatarUrl: "https://tdesign.gtimg.com/mobile/demos/avatar1.png"
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
