// pages/my/info/index.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "",
    nickname: "",
    phoneNumber: ""
  },
  onLoad() {
    console.log("info page onload...");
    console.log("info page globaldata", app.globalData.userInfo);
    this.setData({
      avatarUrl: app.globalData.userInfo.avatarUrl,
      nickname: app.globalData.userInfo.nickname,
      phoneNumber: app.globalData.userInfo.phoneNumber
    });
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail;
    console.log(avatarUrl);
    this.setData({
      avatarUrl
    });
  },
  updateUserInfo() {
    console.log("updateUserInfo: ", this.data.avatarUrl, this.data.nickname);
  }
});
