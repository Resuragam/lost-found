// pages/my/info/index.js
const defaultAvatarUrl = "https://tdesign.gtimg.com/mobile/demos/avatar1.png";
const defaultNickname = "默认名称";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    nickname: defaultNickname,
    phoneNumber: ""
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail;
    console.log(avatarUrl);
    this.setData({
      avatarUrl
    });
  },
  updateUserInfo() {
    console.log('updateUserInfo: ', this.data.avatarUrl, this.data.nickname)
  }
});
