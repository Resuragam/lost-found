import { updateUserInfo } from "../../../api/user";
import { deleteFile, uploadFile } from "../../../utils/file";

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
      wx.showLoading({
        title: "保存中"
      });
      if (!this.data.nickname) {
        return wx.showToast({
          icon: "none",
          title: "名称不能为空"
        });
      }
      if (!this.data.phoneNumber) {
        return wx.showToast({
          icon: "none",
          title: "电话号码不能为空"
        });
      }
      const openId = wx.getStorageSync("openId");
      let fileId = "";
      // 如果头像更新
      if (this.data.temporaryAvatarUrl) {
        // 更新新的头像文件
        fileId = await uploadFile(
          this.data.avatarUrl,
          `user/${openId}_${Date.now()}`
        );

        // 删除旧头像文件
        await deleteFile(this.data.avatarUrl);
      }
      const res = await updateUserInfo(
        openId,
        this.data.nickname,
        fileId,
        this.data.phoneNumber
      );
      wx.hideLoading();

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
