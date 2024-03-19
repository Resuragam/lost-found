import { updateUserInfo } from "../../../api/user";
import { uploadFile } from "../../../utils/uploadFile";

// pages/my/info/index.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "",
    nickname: "",
    phoneNumber: "",
    temporaryAvatarUrl: ""
  },
  onLoad() {
    this.setData({
      avatarUrl: app.globalData.userInfo.avatarUrl,
      nickname: app.globalData.userInfo.nickname,
      phoneNumber: app.globalData.userInfo.phoneNumber
    });
  },
  onChooseAvatar(e) {
    // 获取当前文件的临时路径
    const { avatarUrl } = e.detail;
    this.setData({
      avatarUrl,
      temporaryAvatarUrl: avatarUrl
    });
  },
  async updateUserInfo() {
    try {
      const that = this;
      console.log("updateUserInfo: ", this.data.avatarUrl, this.data.nickname);
      const openId = wx.getStorageSync("openId");
      let fileId = "";
      // 如果头像更新
      if (this.data.temporaryAvatarUrl) {
        fileId = await uploadFile(
          this.data.avatarUrl,
          `user/${openId}`,
          function (res) {
            console.log(
              `用户头像上传进度：${res.progress}%，已上传${res.totalBytesSent}B，共${res.totalBytesExpectedToSend}B`
            );
          }
        );
      }
      const res = await updateUserInfo(
        openId,
        this.data.nickname,
        fileId,
        this.data.phoneNumber
      );
      wx.showToast({
        title: "更新成功",
        icon: "success",
        success: function () {
          app.globalData.userInfo.avatarUrl = fileId
            ? fileId
            : that.data.avatarUrl;
          app.globalData.userInfo.nickname = that.data.nickname;
          app.globalData.userInfo.phoneNumber = that.data.phoneNumber;
          console.log("update success: ", app.globalData.userInfo);
        }
      });
    } catch (e) {
      console.error(e);
      wx.showToast({
        title: "更新失败，请稍后重试",
        icon: "error"
      });
    }
  }
});
